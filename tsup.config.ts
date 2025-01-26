import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src"],
    format: ["esm"],
    splitting: false,
    minify: false,
    target: "esnext",
    minifyIdentifiers: false,
});
