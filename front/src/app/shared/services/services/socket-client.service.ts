import { Injectable, Inject } from '@angular/core';
import * as socket from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class SocketClientService {
  private socket;
  constructor() {
    this.socket = socket.io('localhost:15600');
    this.socket.connect();
    console.log(this.socket);
    this.socket.on('message', (data) => {
      console.log(data);
    });
    this.socket.emit('message', 'world');
  }
}
