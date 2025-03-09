import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src"],
    format: ["esm"],
    splitting: false,
    minify: true,
    target: "esnext",
    minifyIdentifiers: false,
});
