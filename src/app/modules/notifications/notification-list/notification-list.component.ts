import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification } from '../notification.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss'
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  // Load notifications
  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data;
    });
  }

  // Mark notification as read
  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId);
    this.loadNotifications(); // Reload after marking as read
  }

  // Dismiss a notification
  dismissNotification(notificationId: string): void {
    this.notificationService.dismissNotification(notificationId);
    this.loadNotifications(); 
  }
}