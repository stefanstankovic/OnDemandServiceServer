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
RUN /app/node_modules/.bin/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:"/app/dist/grpc/_proto/ranks" \
    --grpc_out="/app/dist/grpc/_proto/ranks" \
    --plugin=protoc-gen-grpc="/app/node_modules/.bin/grpc_tools_node_protoc_plugin" \
    -I "/app/src/grpc/_proto/" \
    "/app/src/grpc/_proto/ranks.proto"
RUN /app/node_modules/.bin/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:"/app/dist/grpc/_proto/user" \
    --grpc_out="/app/dist/grpc/_proto/user" \
    --plugin=protoc-gen-grpc="/app/node_modules/.bin/grpc_tools_node_protoc_plugin" \
    -I "/app/src/grpc/_proto/" \
    "/app/src/grpc/_proto/user.proto"
RUN /app/node_modules/.bin/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:"/app/dist/grpc/_proto/workers" \
    --grpc_out="/app/dist/grpc/_proto/workers" \
    --plugin=protoc-gen-grpc="/app/node_modules/.bin/grpc_tools_node_protoc_plugin" \
    -I "/app/src/grpc/_proto/" \
    "/app/src/grpc/_proto/workers.proto"

EXPOSE 80
CMD ["node", "/app/dist/server.js"]