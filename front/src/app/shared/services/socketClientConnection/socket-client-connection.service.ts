import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { io } from 'socket.io-client';
import { AppModule } from 'src/app/app.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: AppModule,
})
export class SocketClientConnectionService {
  private socket: any;
  private url: string = environment.UrlSocket;
  private port: number = environment.portSocket;
  constructor() {
    this.socket = io(`${this.url}:${this.port}`);
    this.socket.on('connect', console.log);
    this.socket.connect();
  }
  getSocket() {
    return this.socket;
  }
  ngOnDestroy(): void {
    /*     this.socket.disconnect();
     */
  }
}
