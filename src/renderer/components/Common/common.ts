import fs from "fs";
import os from "os";
import path from "path";

export function getFiles(path: string) {
  /**
   * Retrieves the list of files in a given directory path.
   * If the path does not exist, the function creates the directory recursively before retrieving the files.
   *
   * @param path - The directory path for which to retrieve the files.
   * @returns An array of strings representing the names of the files in the directory.
   *
   * @example
   * const files = getFiles("/path/to/directory");
   * console.log(files);
   * // Output: ["file1.txt", "file2.txt", "file3.txt"]
   */
  try {
    fs.accessSync(path);
  } catch (err) {
    fs.mkdirSync(path, { recursive: true });
  }
  return fs.readdirSync(path);
}

export function getFilesByType(path: string, type: string) {
  // Returns an array of file names that have the specified file type in the given path.
  //
  // Parameters:
  //   path (string): The path to the directory where the files are located.
  //   type (string): The file type to filter the files by.
  //
  // Returns:
  //   An array of file names that have the specified file type in the given path.

  return fs.readdirSync(path).filter((item) => item.endsWith(type));
}

export function saveFile(path: string, data: string) {
  /**
   * Saves data to a file.
   *
   * @param path - The path of the file to be saved.
   * @param data - The data to be written to the file.
   * @returns None.
   *
   * @example
   * import { saveFile } from "./fileUtils";
   *
   * const filePath = "/path/to/file.txt";
   * const data = "Hello, world!";
   *
   * saveFile(filePath, data);
   *
   * In this example, we import the `saveFile` function from a module called `fileUtils`. We then define a file path and some data to be written to the file. Finally, we call the `saveFile` function with the file path and data as arguments, which saves the data to the specified file.
   */
  fs.writeFileSync(path, data);
}

export function readFile(path: string): string {
  /**
   * Reads the contents of a file given its path.
   *
   * @param path - The path of the file to be read.
   * @returns The contents of the file as a string.
   * @throws If the file is not found or the directory is not found.
   *
   * @example
   * const filePath = path.join(__dirname, "file.txt");
   * const fileContents = readFile(filePath);
   * console.log(fileContents);
   *
   * In this example, we first construct the file path using the `path.join` method, specifying the directory name (`__dirname`) and the file name (`file.txt`). Then, we call the `readFile` function passing the file path as an argument and assign the returned contents to the `fileContents` variable. Finally, we log the contents to the console.
   */
  return fs.readFileSync(path, "utf-8");
}

export function getDocumentsPath(): string {
  /**
   * Returns the path to the user's "Documents" directory.
   *
   * @returns The path to the user's "Documents" directory as a string.
   *
   * @example
   * const documentsPath = getDocumentsPath();
   * console.log(documentsPath); // Output: "/Users/username/Documents"
   */
  const homeDir = os.homedir();
  return path.join(homeDir, "Documents");
}

export function deleteFile(path: string) {
  /**
   * Deletes a file from the file system.
   *
   * @param path - The path of the file to be deleted.
   * @returns None. The function only logs error or success messages.
   */
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
