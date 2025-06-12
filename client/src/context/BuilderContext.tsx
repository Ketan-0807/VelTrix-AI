import React, { createContext, useContext, useState } from 'react';
import { FileNode, Step } from '../types';
import { generateMockFileSystem, generateMockSteps } from '../utils/mockData';
import { buildFileTree } from '../utils/buildFileTree';

interface BuilderContextType {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  fileSystem: FileNode[];
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>; // <-- Add this
  activeFile: FileNode | null;
  setActiveFile: React.Dispatch<React.SetStateAction<FileNode | null>>;
  generateWebsite: (prompt: string) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [fileSystem, setFileSystem] = useState<FileNode[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [activeFile, setActiveFile] = useState<FileNode | null>(null);

  const generateWebsite = (prompt: string) => {
    // In a real application, this would call an API to generate content
    // For now, we'll use mock data
    
      setPrompt(prompt);
      const flatFiles = generateMockFileSystem(); // still flat
      const tree = buildFileTree(flatFiles); // convert to tree
      setFileSystem(tree); // set nested files
      setSteps(generateMockSteps());
   
  };

  return (
    <BuilderContext.Provider
      value={{
        prompt,
        setPrompt,
        fileSystem,
        steps,
        setSteps,
        activeFile,
        setActiveFile,
        generateWebsite
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};