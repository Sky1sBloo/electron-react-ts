import electron from 'electron';

/**
 * Everything in here will be exposed in UI
 *
 * @see types.d.ts at interface window.electron to set types
 */
electron.contextBridge.exposeInMainWorld('electron', {
} satisfies Window['electron']);

/// Wrappers for IPC Functions below
export const ipcRendererInvoke = <Channel extends keyof IPC_RequestResponseChannels>(
    channel: Channel, payload: IPC_RequestResponseChannels[Channel]['receiveParam']): Promise<IPC_RequestResponseChannels[Channel]['sendParam']> => {
    return electron.ipcRenderer.invoke(channel, payload);
}

export const ipcRendererOn = <Channel extends keyof IPC_Channels>(
    channel: Channel,
    callback: (payload: IPC_Channels[Channel]) => void) => {
    const rendererCallback = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
    electron.ipcRenderer.on(channel, rendererCallback);
    return () => electron.ipcRenderer.off(channel, rendererCallback);
}

export const ipcRendererSend = <Channel extends keyof IPC_Channels>(
    channel: Channel,
    payload: IPC_Channels[Channel]
) => {
    electron.ipcRenderer.send(channel, payload);
}
