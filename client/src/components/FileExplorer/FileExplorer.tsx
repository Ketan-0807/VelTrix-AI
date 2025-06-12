import React, { useState } from "react";
import FileItem from "./FileItem";
import FolderItem from "./FolderItem";
import { FileNode } from "../../types";

interface FileExplorerProps {
  files: FileNode[];
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderFileNode = (node: FileNode, level = 0): React.ReactNode => {
    if (node.type === "folder") {
      const isOpen = openFolders[node.id] || false;

      return (
        <FolderItem
          key={node.id}
          folder={node}
          level={level}
          isOpen={isOpen}
          onToggle={() => toggleFolder(node.id)}>
          {isOpen &&
            node.children?.map((child) => renderFileNode(child, level + 1))}
        </FolderItem>
      );
    }

    return <FileItem key={node.id} file={node} level={level} />;
  };

  // Sort files so that "src" folder appears first
  const sortedFiles = [...files].sort((a, b) => {
    if (a.name === "src") return -1;
    if (b.name === "src") return 1;
    return 0;
  });

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-lg font-semibold">Files</h2>
      </div>
      <div className="space-y-1">
        {sortedFiles.map((node) => renderFileNode(node))}
      </div>
    </div>
  );
};

export default FileExplorer;
