import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SocketClientConnectionService } from '../socketClientConnection/socket-client-connection.service';

@Injectable({
  providedIn: 'root',
})
export class SocketClientService {
  private subjectsSocket: { [key: string]: Subject<any> } = {};
  constructor(private socketService: SocketClientConnectionService) {}
  public getOn(nameEvent: string) {
    this.socketService.getSocket().on(nameEvent, (data) => {
      if (!this.subjectsSocket[nameEvent]) {
        this.subjectsSocket[nameEvent] = new Subject<any>();
      }
      this.subjectsSocket[nameEvent].next(data);
    });
  }
  public subscribe(nameEvent: string): Observable<any> {
    return this.subjectsSocket[nameEvent]?.asObservable();
  }
  public unsubscribeListenSocket(nameEvent: string): void {
    this.socketService.getSocket().removeAllListeners(nameEvent);
  }
  public emitSocket(nameEvent: string, params: any) {
    this.socketService.getSocket().emit(nameEvent, params);
  }
}
