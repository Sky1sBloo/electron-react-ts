import { app, BrowserWindow } from 'electron';
import { runApplication } from './application.js';
import Configuration from './configuration.js'

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: Configuration.getPreloadPath(),
            sandbox: true
        }
    });
    if (Configuration.isDev()) {
        mainWindow.loadURL(Configuration.UI_DEV_URL)
    } else {
        mainWindow.loadFile(Configuration.getUIPath());
    }

    runApplication();
});
