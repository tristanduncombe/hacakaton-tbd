import { contextBridge } from "electron";
import { Titlebar } from "custom-electron-titlebar";

contextBridge.exposeInMainWorld("Titlebar", Titlebar);
