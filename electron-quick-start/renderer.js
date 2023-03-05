/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { ipcRenderer, remote } = require("electron");
const { BrowserWindow } = remote;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("send").addEventListener("click", () => {
    ipcRenderer.send("message", "渲染进程 send message");
  });

  document.getElementById("baidu").addEventListener("click", () => {
    let win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL("https://www.baidu.com");
  });

  // 监听 IPC 通信
  ipcRenderer.on("reply", (event, arg) => {
    document.getElementById("message").innerHTML = arg;
  });
});
