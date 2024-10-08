import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Backend URL
  }

  listen(event: string) {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
