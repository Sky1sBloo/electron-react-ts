# Electron + React + Typescript Vite Configuration
Configuration that supports typed IPC

## How to use
- all `ipcMain` and `ipcRenderer` wrapper functions is in the `electron/ipcMainHandler.ts` and `preload/preload.cts` script to allow for type checking
- `src/types.d.ts` allows for global type information for both frontend and backend
- all backend should be in `src/electron`
- all frontend should be in `src/ui`

## Installation
See `package.json` for list of scripts

### Common Commands
```
npm run dev
```
Runs the development build

```
npm run dist:win
npm run dist:max
npm run dist:linux
```
Builds the application to the desired os
