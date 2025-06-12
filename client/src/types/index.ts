export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
  // language?: string;
  path: string;
  isOpen?: boolean;
}

export enum StepType {
  CreateFile,
  CreateFolder,
  EditFile,
  DeleteFile,
  RunScript,
}

export interface Step {
  id: string;
  title: string;
  type: StepType;
  description: string;
  completed: boolean;
  code?: string;
  path?: string;
}
