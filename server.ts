import * as express from 'express';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as http from 'http';

var app = express();
app.use(serveStatic(path.resolve(__dirname, 'public')));
var server = http.createServer(app);
console.log('Server is online!');
server.listen(8000);