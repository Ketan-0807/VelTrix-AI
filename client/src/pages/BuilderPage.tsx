import React, { useEffect, useState } from "react";
import { ArrowLeft, Code2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useBuilder } from "../context/BuilderContext";
import FileExplorer from "../components/FileExplorer/FileExplorer";
import StepsList from "../components/StepsList";
import ContentViewer from "../components/ContentViewer";
import Button from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { parseXML } from "../steps";
import { FileNode, Step, StepType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useWebContainer } from "../hooks/useWebContainer";
import { PreviewFrame } from "../components/PreviewFrame";

const BuilderPage: React.FC = () => {
  const { prompt, activeFile, steps, setSteps } = useBuilder();

  const [userPrompt, setPrompt] = useState("");

  const [llmMessages, setLLMMessages] = useState<
    { role: "user" | "assistant"; parts: [{ text: string }] }[]
  >([]);

  const webcontainer = useWebContainer();

  const [view, setView] = useState<"code" | "preview">("code");

  const [files, setFiles] = useState<FileNode[]>([]);

  useEffect(() => {
    let originalFiles = [...files];

    let updateHappened = false;

    steps
      .filter(({ completed }) => completed === false)
      .forEach((step) => {
        if (step.type === StepType.CreateFile && step.path) {
          // console.log("Creating file:");

          updateHappened = true;

          let parsedPath = step.path.split("/").filter(Boolean);
          // e.g. ["src", "components", "App.tsx"]
          let currentFileStructure = [...originalFiles];
          let finalAnswerRef = currentFileStructure;
          let currentFolderPath = "";

          for (let i = 0; i < parsedPath.length; i++) {
            const segment = parsedPath[i];
            currentFolderPath += `/${segment}`;

            const isFile = i === parsedPath.length - 1;

            if (isFile) {
              const existingFile = currentFileStructure.find(
                (x) => x.path === currentFolderPath && x.type === "file"
              );
              if (existingFile) {
                existingFile.content = step.code;
              } else {
                currentFileStructure.push({
                  id: uuidv4(),
                  name: segment,
                  type: "file",
                  path: currentFolderPath,
                  content: step.code,
                });
              }
            } else {
              let folder = currentFileStructure.find(
                (x) => x.path === currentFolderPath && x.type === "folder"
              );

              if (!folder) {
                folder = {
                  id: uuidv4(),
                  name: segment,
                  type: "folder",
                  path: currentFolderPath,
                  children: [],
                };
                currentFileStructure.push(folder);
              }

              currentFileStructure = folder.children!;
            }

            originalFiles = finalAnswerRef;
          }
        }
      });

    if (updateHappened) {
      setFiles(originalFiles);
      // console.log("originalFiles", originalFiles);

      setSteps((prevSteps) =>
        prevSteps.map((s) => ({
          ...s,
          completed: true,
        }))
      );
    }
  }, [steps, setSteps]);

  useEffect(() => {
    const createMountStructure = (files: FileNode[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};

      const processFile = (file: FileNode, isRootFolder: boolean) => {
        if (file.type === "folder") {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children
              ? Object.fromEntries(
                  file.children.map((child) => [
                    child.name,
                    processFile(child, false),
                  ])
                )
              : {},
          };
        } else if (file.type === "file") {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || "",
              },
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || "",
              },
            };
          }
        }

        return mountStructure[file.name];
      };

      // Process each top-level file/folder
      files.forEach((file) => processFile(file, true));

      return mountStructure;
    };

    const mountStructure = createMountStructure(files);

    // Mount the structure if WebContainer is available
    console.log(mountStructure);
    webcontainer?.mount(mountStructure);
  }, [files, webcontainer]);

  const init = async () => {
    const response = await axios.post(`${BACKEND_URL}/template`, {
      prompt: prompt.trim(),
    });

    const { prompts, uiPrompts } = response.data;

    setSteps(
      parseXML(uiPrompts[0]).map((x: Step) => ({
        ...x,
        completed: false,
      }))
    );

    const stepResponse = await axios.post(`${BACKEND_URL}/chat`, {
      messages: [...prompts, prompt].map((text) => ({
        role: "user",
        parts: [{ text }],
      })),
    });

    console.log("step response:", stepResponse.data);

    const { uiPrompts: stepUiPrompts } = stepResponse.data;
    // console.log("stepUiPrompts:", stepUiPrompts);
    // console.log("stepUI prompts", typeof stepUiPrompts[0]);

    const parsedSteps = parseXML(stepUiPrompts[0]);
    console.log("parsedSteps:", parsedSteps);

    setSteps((s) => [
      ...s,
      ...parsedSteps.map((x) => ({
        ...x,
        completed: false,
      })),
    ]);

    setLLMMessages(
      [...prompts, prompt].map((text) => ({
        role: "user",
        parts: [{ text }],
      }))
    );

    setLLMMessages((x) => [
      ...x,
      {
        role: "assistant",
        parts: [{ text: stepUiPrompts[0] }],
      },
    ]);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link
            to="/"
            className="flex items-center text-gray-400 hover:text-gray-100 mr-4">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-semibold">Web Builder</h1>
          <div className="ml-auto flex items-center space-x-2">
            <div className="bg-gray-800 rounded-md px-3 py-1 max-w-md overflow-hidden text-sm text-gray-400">
              <p className="truncate">{prompt}</p>
            </div>
            <div className="flex bg-gray-800 rounded-md p-1">
              <Button
                variant={view === "code" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setView("code")}
                className="flex items-center">
                <Code2 size={16} className="mr-1" />
                Code
              </Button>
              <Button
                variant={view === "preview" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setView("preview")}
                className="flex items-center">
                <Eye size={16} className="mr-1" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="h-5/6 flex-1 flex w-full">
        <div className="flex flex-col w-1/4 h-full">
          <div className=" bg-gray-900 border-r border-gray-800 overflow-y-auto h-full flex flex-col items-center justify-center">
            <div className="">
              <StepsList />
            </div>
          </div>
          <div className="w-full h-28 flex flex-row items-center justify-center  bg-gray-900 rounded-lg gap-2">
            <textarea
              className="p-2 h-22 w-5/6 border border-blue-500  bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-100"
              placeholder="Make changes to the website here..."
              value={userPrompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}></textarea>

            <Button
              type="submit"
              size="sm"
              className="mt-4 animate-pulse-slow"
              onClick={async () => {
                const newMessage: {
                  role: "user" | "assistant";
                  parts: [{ text: string }];
                } = {
                  role: "user",
                  parts: [{ text: userPrompt }],
                };

                const stepResponse = await axios.post(`${BACKEND_URL}/chat`, {
                  messages: [...llmMessages, newMessage],
                });

                const { uiPrompts: stepUiPrompts } = stepResponse.data;

                setLLMMessages((x) => [...x, newMessage]);
                setLLMMessages((x) => [
                  ...x,
                  {
                    role: "assistant",
                    parts: [{ text: stepUiPrompts[0] }],
                  },
                ]);

                setSteps((s) => [
                  ...s,
                  ...parseXML(stepUiPrompts[0]).map((x) => ({
                    ...x,
                    completed: false,
                  })),
                ]);

                setPrompt("");
              }}>
              Send
            </Button>
          </div>
        </div>

        {view === "code" ? (
          <>
            <div className="w-1/4 bg-gray-900 border-r border-gray-800 overflow-y-auto">
              <FileExplorer files={files} />
            </div>

            <div className="w-1/2 h-full bg-gray-950 overflow-auto">
              {activeFile ? (
                <ContentViewer file={activeFile} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Select a file to view its content</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className=" h-full flex-1 bg-white">
            {webcontainer ? (
              <PreviewFrame webContainer={webcontainer} files={files} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Loading WebContainer...</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BuilderPage;
