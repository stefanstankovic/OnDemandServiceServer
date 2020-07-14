FROM node as build

WORKDIR /app

COPY . .
RUN npm clean-install
RUN npm build
RUN /app/node_modules/.bin/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:"/app/dist/grpc/_proto/ranks" \
    --grpc_out="/app/dist/grpc/_proto/ranks" \
    --plugin=protoc-gen-grpc="/app/node_modules/.bin/grpc_tools_node_protoc_plugin" \
    -I "/app/src/grpc/_proto/" \
    "/app/src/grpc/_proto/ranks.proto"

EXPOSE 5003
CMD ["node", "/app/dist/server.js"]