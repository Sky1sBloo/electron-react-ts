/**
 * Wrapper for ipcMain for typed declarations on functionTypes
 * Use this rather than calling ipcMain functions directly
 */
import { ipcMain, WebContents, WebFrameMain } from "electron";
import { pathToFileURL } from 'url';
import Configuration from "./configuration.js";

export const ipcMainOn = <Channel extends keyof IPC_Channels>(
    channel: Channel, callback: (payload: IPC_Channels[Channel]) => void) => {
    ipcMain.on(channel, (event, args) => {
        validateEventFrame(event.senderFrame);
        callback(args);
    });
}

export const ipcMainHandle = <Channel extends keyof IPC_RequestResponseChannels>(
    channel: Channel, handler: (payload: IPC_RequestResponseChannels[Channel]['receiveParam']) =>
        Promise<IPC_RequestResponseChannels[Channel]['sendParam']> | unknown) => {
    ipcMain.handle(channel, (event, payload) => {
        validateEventFrame(event.senderFrame);
        return handler(payload);
    });
}

export const ipcWebContentsSend = <Channel extends keyof IPC_Channels>(
    channel: Channel, webContents: WebContents, payload: IPC_Channels[Channel]) => {
    webContents.send(channel, payload);
}

/**
 * Ensures that the event frame is from UI port/url
 */
const validateEventFrame = (frame: WebFrameMain | null) => {
    if (frame == null) {
        throw new Error("Event frame is null");
    }

    if (Configuration.isDev() && new URL(frame.url).host === Configuration.UI_DEV_URL) {
        return;
    }
    if (frame.url !== pathToFileURL(Configuration.getUIPath()).toString()) {
        throw new Error('Event frame comes from invalid source');
    }
}
