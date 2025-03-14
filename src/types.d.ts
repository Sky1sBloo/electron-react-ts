/* 
 * List types that should be exposed to both frontend and backend
 * May include payload type information
 */

interface Window {
    // Anything inside here will be exposed to the frontend
    // Can be accessed in the frontend by window.electron.[body]
    // see: preload.cts for type information
    electron: {
    }
}

/**
 * List of IPC Channels with their datatype for one way communication
 */
type IPC_Channels = {
};

/**
 * List of IPC Channels with two way communication
 * Usually contains name and the request response events
 */
type IPC_RequestResponseChannels = {
}

/** 
 * Event for two way communication
 */
type RequestResponseEvent<TReceive, TResponse> = {
    receive: TReceive;
    response: TResponse;
};
