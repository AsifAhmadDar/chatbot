
import { Server } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { agent_joined, join_room, leave_room, send_message } from "../services/service";
import { config } from "../config/config";
let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

function socket_init(server: any) {
  io = new Server(server);
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
    });

    socket.on('agent-connected', (data) => {
      socket.join(config.agents_room);
    })
    socket.on('join-room', (data) => {
      socket.join(data.user._id)
      join_room(data,socket)
    })
    socket.on('leave-room', (data)=>{
      leave_room(data,socket)
    })

    socket.on('agent-join', (data) => {
      socket.join(data.room)
      agent_joined(data,socket)
    })

    socket.on('message', (data:any)=>{
      send_message(data,socket)
    })



  });

}

function getIO() {
  return io;
}

export { socket_init, getIO, io };