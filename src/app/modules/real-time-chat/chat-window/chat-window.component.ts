import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  messageInput: string = '';
  websocketSubscription!: Subscription;

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit(): void {
    // Connect to WebSocket
    this.webSocketService.connect('ws://localhost:8080'); 

    // Subscribe to incoming messages
    this.websocketSubscription = this.webSocketService.onMessage().subscribe((message) => {
      this.messages.push(message);
    });
  }

  // Send a message to WebSocket
  sendMessage(): void {
    if (this.messageInput.trim()) {
      this.webSocketService.sendMessage(this.messageInput);
      this.messageInput = ''; // Clear input after sending
    }
  }

  // Clean up when the component is destroyed
  ngOnDestroy(): void {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }
}