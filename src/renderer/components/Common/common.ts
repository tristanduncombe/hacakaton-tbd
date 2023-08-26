import fs from "fs";
import os from "os";
import path from "path";

export function getFiles(path: string) {
  return fs.readdirSync(path);
}

export function getFilesByType(path: string, type: string) {
  return fs.readdirSync(path).filter((item) => item.endsWith(type));
}

export function saveFile(path: string, data: string) {
  fs.writeFileSync(path, data);
}

export function loadFile(path: string): string {
  return fs.readFileSync(path, "utf-8");
}

export function getDocumentsPath(): string {
  const homeDir = os.homedir();
  return path.join(homeDir, "Documents");
}
