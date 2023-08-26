import fs from "fs";
import os from "os";
import path from "path";

export function getFiles(path: string) {
  try {
    fs.accessSync(path);
  } catch (err) {
    fs.mkdirSync(path, { recursive: true });
  }
  return fs.readdirSync(path);
}

export function getFilesByType(path: string, type: string) {
  return fs.readdirSync(path).filter((item) => item.endsWith(type));
}

export function saveFile(path: string, data: string) {
  fs.writeFileSync(path, data);
}

export function readFile(path: string): string {
  //add error cheking for file not found and diredtory not found

  return fs.readFileSync(path, "utf-8");
}

export function getDocumentsPath(): string {
  const homeDir = os.homedir();
  return path.join(homeDir, "Documents");
}

export function deleteFile(path: string) {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`${path} does not exist`);
      return;
    }

    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting ${path}: ${err}`);
        return;
      }

      console.log(`${path} deleted successfully`);
    });
  });
}
