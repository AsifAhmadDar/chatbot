import {createServer} from 'http';
import { socket_init } from './src/util/socket.util';
import app from './src/app';

const server = createServer(app);
socket_init(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
});

