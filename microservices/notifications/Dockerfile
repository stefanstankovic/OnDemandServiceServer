FROM node as build

WORKDIR /app

COPY . .
RUN npm clean-install
RUN node /app/node_modules/typescript/bin/tsc
RUN /app/node_modules/.bin/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:"/app/dist/grpc/_proto/notifications" \
    --grpc_out="/app/dist/grpc/_proto/notifications" \
    --plugin=protoc-gen-grpc="/app/node_modules/.bin/grpc_tools_node_protoc_plugin" \
    -I "/app/src/grpc/_proto/" \
    "/app/src/grpc/_proto/notifications.proto"

EXPOSE 5002
CMD ["node", "/app/dist/server.js"]