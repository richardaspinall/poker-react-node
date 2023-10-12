import { Socket } from 'socket.io';

export default class SocketHandlers {
  static setUpHandlers(socket: Socket) {
    // response is a callback function that can be used to send data back to the client
    socket.on('hello_from_client', (value: string, response) => {
      console.log(value);
      response(200);
    });

    socket.on('disconnect', (reason) => {
      console.log('disconnected');
      // Handle disconnection logic if needed
    });

    socket.on('some_event', (payload) => {
      // Handle 'some_event' logic
    });
  }
}
