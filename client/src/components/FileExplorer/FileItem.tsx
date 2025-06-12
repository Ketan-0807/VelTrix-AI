import React from "react";
import { FileText } from "lucide-react";
import { useBuilder } from "../../context/BuilderContext";
import { FileNode } from "../../types";

interface FileItemProps {
  file: FileNode;
  level: number;
}

const FileItem: React.FC<FileItemProps> = ({ file, level }) => {
  const { setActiveFile, activeFile } = useBuilder();

  const handleClick = () => {
    setActiveFile(file);
  };

  const isActive = activeFile?.id === file.id;

  return (
    <div
      className={`flex items-center py-1 px-2 rounded cursor-pointer ${
        isActive ? "bg-blue-600/30" : "hover:bg-gray-800"
      }`}
      style={{ paddingLeft: `${level * 16 + 8}px` }}
      onClick={handleClick}>
      <FileText size={16} className="text-gray-400 mr-2" />
      <span className="text-sm truncate">{file.name}</span>
    </div>
  );
};

export default FileItem;
