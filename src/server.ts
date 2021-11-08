import appInitializer from './app-initializer';
import logger from './configuration/logger';
import config from './configuration/config';

class Server {
  private server: any;
  private readonly port: number;

  public constructor() {
    this.port = config.port;
  }

  public async runServer(): Promise<void> {
    try {
      const app = await appInitializer.initialize();
      this.server = app.listen(this.port);
      this.server.on('listening', () => {
        let address = this.server.address();
        logger.info(`Listening on port ${address.port}`);
      });

      this.server.on('error', (error: Error) => {
        logger.error('Server start error: ', error);
        process.exit(1);
      });
    } catch (error) {
      logger.error(error);
      // TODO: Graceful shutdown
    }
  }
}

export default new Server().runServer();
