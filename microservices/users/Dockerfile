FROM node as build

WORKDIR /app

COPY . .
RUN npm clean-install
RUN npm build
RUN /app/node_modules/.bin/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:"/app/dist/grpc/_proto/user" \
    --grpc_out="/app/dist/grpc/_proto/user" \
    --plugin=protoc-gen-grpc="/app/node_modules/.bin/grpc_tools_node_protoc_plugin" \
    -I "/app/src/grpc/_proto/" \
    "/app/src/grpc/_proto/user.proto"

EXPOSE 5001
CMD ["node", "/app/dist/server.js"]