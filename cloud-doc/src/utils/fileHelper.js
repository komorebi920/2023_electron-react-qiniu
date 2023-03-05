const fs = window.require("fs").promises;

const options = { encoding: "utf-8" };
const readFile = (path) => fs.readFile(path, options);
const writeFile = (path, content) => fs.writeFile(path, content, options);
const renameFile = (path, newPath) => fs.rename(path, newPath);
const deleteFile = (path) => fs.unlink(path);

export default { readFile, writeFile, renameFile, deleteFile };
