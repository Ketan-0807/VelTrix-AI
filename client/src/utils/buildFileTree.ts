// utils/buildFileTree.ts
import { FileNode } from "../types";

export function buildFileTree(files: FileNode[]): FileNode[] {
  const root: FileNode[] = [];
  const pathMap: Record<string, FileNode> = {};

  for (const file of files) {
    const segments = file.path.split("/").filter(Boolean);
    let currentPath = "";
    let currentLevel = root;

    for (let i = 0; i < segments.length; i++) {
      const isFile = i === segments.length - 1;
      currentPath += "/" + segments[i];

      if (!pathMap[currentPath]) {
        const node: FileNode = {
          id: isFile ? file.id : `${currentPath}`, // make sure folder has unique id
          name: segments[i],
          type: isFile ? "file" : "folder",
          path: currentPath,
          content: isFile ? file.content : undefined,
          children: !isFile ? [] : undefined,
          isOpen: false,
        };
        pathMap[currentPath] = node;
        currentLevel.push(node);
      }

      if (!isFile) {
        currentLevel = pathMap[currentPath].children!;
      }
    }
  }

  return root;
}
