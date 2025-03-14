import { app } from 'electron';
import path from 'path';

/**
 * Contains information about app state and paths
 */
export namespace Configuration {
    export const UI_DEV_URL: string = 'http://localhost:2325';

    export const getPreloadPath = () => {
        return path.join(
            app.getAppPath(),
            Configuration.isDev() ? '.' : '..',
            '/dist-electron/preload/preload.cjs'
        );
    }

    export const getUIPath = (): string => {
        return path.join(app.getAppPath(), 'dist-react/index.html');
    }

    // Checks if the node environment is a development environment
    export const isDev = (): boolean => {
        return process.env.NODE_ENV === 'development';
    }
}

export default Configuration;
