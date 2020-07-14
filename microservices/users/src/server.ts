// import './utils/config';
import * as grpc from "grpc";
import userHandler from "./grpc/handlers/user.handler";
import { connect, set } from "mongoose";
import { isEmpty, isNull } from "lodash";

type StartServerType = () => void;
export const startServer: StartServerType = (): void => {
  const server: grpc.Server = new grpc.Server();

  set("useFindAndModify", false);

  if (isEmpty(process.env.DB_USER) && isEmpty(process.env.DB_PASS)) {
    connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (!isNull(err)) {
          console.log(err);
        }
      }
    );
  } else {
    connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (!isNull(err)) {
          console.log(err);
        }
      }
    );
  }

  server.addService(userHandler.server, userHandler.handler);
  server.bindAsync(
    `0.0.0.0:${process.env.GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number): void => {
      if (err != null) {
        return console.error(err);
      }

      console.log(`gRPC listening on ${port}`);
    }
  );

  server.start();
};

startServer();
