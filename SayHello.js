const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/example.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const greeterProto = grpc.loadPackageDefinition(packageDefinition).example;

const client = new greeterProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

const name = process.argv.length >= 3 ? process.argv[2] : 'world';

client.sayHello({ name }, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log(response.message);
  }
});
