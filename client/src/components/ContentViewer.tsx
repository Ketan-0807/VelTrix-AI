import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FileNode } from '../types';

interface ContentViewerProps {
  file: FileNode;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ file }) => {
  const getLanguage = () => {
    if (file.language) return file.language;
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'text';
    }
  };

  return (
    <div className="p-4">
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
          <h3 className="text-sm font-medium text-gray-300">{file.name}</h3>
        </div>
        <div className="overflow-auto max-h-[calc(100vh-200px)]">
          {file.content ? (
            <SyntaxHighlighter
              language={getLanguage()}
              style={atomOneDark}
              customStyle={{ 
                margin: 0, 
                padding: '1rem', 
                background: 'rgb(15, 15, 20)',
                borderRadius: '0 0 0.5rem 0.5rem',
                fontSize: '0.9rem',
              }}
              showLineNumbers
            >
              {file.content}
            </SyntaxHighlighter>
          ) : (
            <div className="p-4 text-gray-400">No content to display.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentViewer;