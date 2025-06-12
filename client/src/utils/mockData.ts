import { FileNode, Step } from "../types";

import { StepType } from "../types"; // Adjusted the path to reference the StepType from the correct path

export const generateMockFileSystem = (): FileNode[] => {
  return [
    {
      id: "1",
      name: "src",
      type: "folder",
      isOpen: true,
      path: "/src", // Added path attribute
      children: [
        {
          id: "2",
          name: "components",
          type: "folder",
          isOpen: false,
          path: "/src/components", // Added path attribute
          children: [
            {
              id: "3",
              name: "Button.jsx",
              type: "file",
              path: "/src/components/Button.jsx", // Added path attribute
              content: `import React from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={\`px-4 py-2 rounded-md \${
        variant === 'primary' 
          ? 'bg-blue-500 hover:bg-blue-600' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;`,
            },
            {
              id: "4",
              name: "Card.jsx",
              type: "file",
              path: "/src/components/Card.jsx", // Added path attribute
              content: `import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;`,
            },
          ],
        },
        {
          id: "5",
          name: "App.jsx",
          type: "file",
          path: "/src/App.jsx", // Added path attribute
          content: `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;`,
        },
        {
          id: "6",
          name: "index.jsx",
          type: "file",
          path: "/src/index.jsx", // Added path attribute
          content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        },
      ],
    },
    {
      id: "7",
      name: "public",
      type: "folder",
      isOpen: false,
      path: "/public", // Added path attribute
      children: [
        {
          id: "8",
          name: "index.html",
          type: "file",
          path: "/public/index.html", // Added path attribute
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Website</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>`,
        },
      ],
    },
    {
      id: "9",
      name: "package.json",
      type: "file",
      path: "/package.json", // Added path attribute
      content: `{
  "name": "my-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.2.4",
    "vite": "^4.1.0"
  }
}`,
    },
  ];
};

export const generateMockSteps = (): Step[] => {
  return [
    {
      id: "1",
      title: "Project Initialization",
      description:
        "Create a new React project with Vite and install dependencies.",
      type: StepType.RunScript,
      completed: true,
    },
    {
      id: "2",
      title: "Setup Routing",
      description: "Configure React Router for navigation between pages.",
      type: StepType.EditFile,
      completed: true,
    },
    {
      id: "3",
      title: "Create Components",
      description: "Build reusable UI components for the website.",
      type: StepType.CreateFile,
      completed: false,
    },
    {
      id: "4",
      title: "Implement Pages",
      description: "Develop the main pages of the website with the components.",
      type: StepType.EditFile,
      completed: false,
    },
    {
      id: "5",
      title: "Style Application",
      description: "Apply Tailwind CSS styles for a responsive design.",
      type: StepType.EditFile,
      completed: false,
    },
    {
      id: "6",
      title: "Add Animations",
      description: "Implement smooth transitions and animations.",
      type: StepType.EditFile,
      completed: false,
    },
    {
      id: "7",
      title: "Test Responsiveness",
      description: "Ensure the website works well on different screen sizes.",
      type: StepType.RunScript,
      completed: false,
    },
    {
      id: "8",
      title: "Deploy Application",
      description: "Build and deploy the website to a hosting platform.",
      type: StepType.RunScript,
      completed: false,
    },
  ];
};
