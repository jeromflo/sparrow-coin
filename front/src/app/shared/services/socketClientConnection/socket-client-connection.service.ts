import { Injectable } from '@angular/core';
import * as socket from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketClientConnectionService {
  private socket: socket.Socket;
  constructor() {
    this.socket = socket.io('localhost:15600');
    this.socket.connect();
  }
  getSocket(): socket.Socket {
    return this.socket;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.socket.disconnect();
  }
}
