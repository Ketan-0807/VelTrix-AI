import React from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { FileNode } from "../../types";

interface FolderItemProps {
  folder: FileNode;
  level: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  level,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div>
      <div
        className="flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-800"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={onToggle}>
        <span className="mr-1">
          {isOpen ? (
            <ChevronDown size={16} className="text-gray-400" />
          ) : (
            <ChevronRight size={16} className="text-gray-400" />
          )}
        </span>
        {isOpen ? (
          <FolderOpen size={16} className="text-yellow-500 mr-2" />
        ) : (
          <Folder size={16} className="text-yellow-500 mr-2" />
        )}
        <span className="text-sm font-medium">{folder.name}</span>
      </div>
      <div className={isOpen ? "block" : "hidden"}>{children}</div>
    </div>
  );
};

export default FolderItem;
