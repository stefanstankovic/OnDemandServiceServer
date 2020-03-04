import './utils/config';
import * as grpc from 'grpc';
import userHandler  from './grpc/handlers/userHandler';

export const startServer: (() => void) = (): void => {
    const server: grpc.Server = new grpc.Server();

    server.addService(userHandler.server, userHandler.handler);

server.bindAsync(
    `0.0.0.0:${process.env.GRPC_PORT}`, 
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number): void => {
        if (err != null) {
            return console.error(err);
        }

        console.log(`gRPC listening on ${ port }`);
    });

    server.start();
}

startServer();