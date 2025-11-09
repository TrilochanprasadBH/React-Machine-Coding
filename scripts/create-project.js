import fs from "fs";
import path from "path";

let name = process.argv[2];

if (!name) {
  console.error("❌ Provide project name: pnpm create-project <name>");
  process.exit(1);
}

// normalize folder name (lowercase)
name = name.toLowerCase();

const root = process.cwd();
const projectDir = path.join(root, "projects", name);

// prevent overwrite
if (fs.existsSync(projectDir)) {
  console.error(`❌ Project '${name}' already exists.`);
  process.exit(1);
}

// create project folders
fs.mkdirSync(projectDir, { recursive: true });
fs.mkdirSync(path.join(projectDir, "src"), { recursive: true });

//
// ------------------------------
// package.json
// ------------------------------
fs.writeFileSync(
  path.join(projectDir, "package.json"),
  JSON.stringify(
    {
      name,
      private: true,
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
    },
    null,
    2
  )
);

//
// ------------------------------
// ✅ FINAL VITE CONFIG (alias + fs.allow)
// ------------------------------
fs.writeFileSync(
  path.join(projectDir, "vite.config.js"),
  `import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ✅ alias so @shared works
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../../shared")
    }
  },

  // ✅ allow reading shared folder + workspace root
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(__dirname),
        __dirname,
        path.resolve(__dirname, "../../shared")
      ]
    }
  }
});
`
);

//
// ------------------------------
// index.html
// ------------------------------
fs.writeFileSync(
  path.join(projectDir, "index.html"),
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${name}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
);

//
// ------------------------------
// src/main.jsx
// ------------------------------
fs.writeFileSync(
  path.join(projectDir, "src", "main.jsx"),
  `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// ✅ Always use alias
import "@shared/base.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
`
);

//
// ------------------------------
// src/App.jsx
// ------------------------------
fs.writeFileSync(
  path.join(projectDir, "src", "App.jsx"),
  `export default function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center text-4xl font-bold">
      ${name} ✅ Tailwind v4 working perfectly!
    </div>
  );
}
`
);

console.log("✅ Project '" + name + "' created successfully!");
console.log("👉 cd projects/" + name + " && pnpm dev");
