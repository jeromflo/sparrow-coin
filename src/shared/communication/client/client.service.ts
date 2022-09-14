import { Injectable } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
@Injectable()
export class ClientService {
  private socket: Socket;
  connectTo(url, port) {
    this.socket = io(`${url}:${port}`);
  }
}
