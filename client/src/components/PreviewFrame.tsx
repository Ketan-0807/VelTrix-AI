import { WebContainer } from "@webcontainer/api";

import React, { useEffect, useState } from "react";

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer; // This requires a non-null WebContainer
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Setting up environment...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function setupPreview() {
      try {
        // Make sure we have a package.json
        const hasPackageJson = await checkForPackageJson(webContainer);

        if (!hasPackageJson) {
          await createBasicPackageJson(webContainer);
        }

        // Setup server-ready event listener first to avoid race conditions
        webContainer.on("server-ready", (port, serverUrl) => {
          if (isMounted) {
            console.log("Server is ready on port:", port);
            console.log("URL:", serverUrl);
            setUrl(serverUrl);
            setStatus("Preview loaded!");
            setIsLoading(false);
          }
        });

        // Install dependencies
        setStatus("Installing dependencies...");
        await runNpmInstall(webContainer);

        // Start dev server
        setStatus("Starting development server...");
        await startDevServer(webContainer);
      } catch (error) {
        console.error("Preview setup error:", error);
        setStatus(
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
        setIsLoading(false);
      }
    }

    setupPreview();

    return () => {
      isMounted = false;
    };
  }, [webContainer]);

  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-800">
      {isLoading && (
        <div className="text-center p-8 bg-gray-100 rounded-lg shadow">
          <div className="animate-pulse mb-4 h-8 w-8 mx-auto border-4 border-gray-400 border-t-blue-500 rounded-full"></div>
          <p className="text-lg font-medium">{status}</p>
          <p className="text-sm text-gray-500 mt-2">
            This may take a few moments...
          </p>
        </div>
      )}
      {url && (
        <iframe
          className="w-full h-full border-none"
          src={url}
          title="Preview"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        />
      )}
    </div>
  );
}

// Helper functions
async function checkForPackageJson(
  webContainer: WebContainer
): Promise<boolean> {
  try {
    const packageJsonFiles = await webContainer.fs.readdir("/");
    return packageJsonFiles.includes("package.json");
  } catch (error) {
    return false;
  }
}

async function createBasicPackageJson(
  webContainer: WebContainer
): Promise<void> {
  const packageJson = {
    name: "web-preview",
    version: "1.0.0",
    description: "Web preview",
    scripts: {
      dev: "vite --host",
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    },
    devDependencies: {
      "@types/react": "^18.2.15",
      "@types/react-dom": "^18.2.7",
      vite: "^4.4.9",
    },
  };

  await webContainer.fs.writeFile(
    "/package.json",
    JSON.stringify(packageJson, null, 2)
  );

  // Create a basic index.html if it doesn't exist
  try {
    const rootFiles = await webContainer.fs.readdir("/");
    const hasIndexHtml = rootFiles.includes("index.html");

    if (!hasIndexHtml) {
      await webContainer.fs.writeFile(
        "/index.html",
        `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
      );
    }
  } catch (error) {
    console.error("Error checking for index.html:", error);
    // Create the file anyway as a fallback
    await webContainer.fs.writeFile(
      "/index.html",
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
    );
  }
}

async function runNpmInstall(webContainer: WebContainer): Promise<void> {
  let installExitCode;

  try {
    const installProcess = await webContainer.spawn("npm", ["install"]);

    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(`[npm install] ${data}`);
        },
      })
    );

    installExitCode = await installProcess.exit;
  } catch (error) {
    console.error("Installation error:", error);
    throw new Error("Failed to install dependencies");
  }

  if (installExitCode !== 0) {
    throw new Error(`Installation failed with exit code: ${installExitCode}`);
  }
}

async function startDevServer(webContainer: WebContainer): Promise<void> {
  try {
    const devProcess = await webContainer.spawn("npm", ["run", "dev"]);

    devProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(`[dev server] ${data}`);
        },
      })
    );
  } catch (error) {
    console.error("Dev server error:", error);
    throw new Error("Failed to start development server");
  }
}
