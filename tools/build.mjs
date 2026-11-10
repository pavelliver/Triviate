// Builds app.js and sw.js from src/triviate.jsx.
// Usage: npm install && npm run build
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = join(root, "tools", ".tmp");
mkdirSync(tmp, { recursive: true });

// The game loads Google Fonts when it runs on its own; the app ships its own fonts.
const src = readFileSync(join(root, "src", "triviate.jsx"), "utf8").replace(
  /^@import url\('https:\/\/fonts\.googleapis\.com[^\n]*\n/m,
  ""
);
writeFileSync(join(tmp, "game.jsx"), src);
writeFileSync(
  join(tmp, "entry.jsx"),
  `import React from "react";
import { createRoot } from "react-dom/client";
import Game from "./game.jsx";
createRoot(document.getElementById("root")).render(<Game />);
`
);

await build({
  entryPoints: [join(tmp, "entry.jsx")],
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: join(root, "app.js"),
  legalComments: "none",
  logLevel: "warning",
});

const hash = createHash("sha256")
  .update(readFileSync(join(root, "app.js")))
  .update(readFileSync(join(root, "index.html")))
  .digest("hex")
  .slice(0, 10);

const assets = [
  "./",
  "index.html",
  "app.js",
  "manifest.webmanifest",
  ...readdirSync(join(root, "icons")).map((f) => "icons/" + f),
  ...readdirSync(join(root, "fonts")).map((f) => "fonts/" + f),
];

const sw = readFileSync(join(root, "tools", "sw.template.js"), "utf8")
  .replace("__VERSION__", "triviate-" + hash)
  .replace("__ASSETS__", JSON.stringify(assets, null, 2));
writeFileSync(join(root, "sw.js"), sw);
console.log("built app.js and sw.js, version triviate-" + hash);
