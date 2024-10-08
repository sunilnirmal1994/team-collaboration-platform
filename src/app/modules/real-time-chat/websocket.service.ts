import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: Subject<any>;

  constructor() {}

  // Connect to WebSocket server
  connect(url: string): void {
    if (!this.socket$) {
      this.socket$ = webSocket(url);
    }
  }

  // Send a message
  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  // Receive messages
  onMessage(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Close the WebSocket connection
  disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}