const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/example.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const greeterProto = grpc.loadPackageDefinition(packageDefinition).example;

function sayHello(call, callback) {
  const name = call.request.name;
  const message = `Hello, ${name}!`;
  callback(null, { message });
}

function main() {
  const server = new grpc.Server();
  server.addService(greeterProto.Greeter.service, { sayHello });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
