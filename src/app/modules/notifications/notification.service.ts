import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [
    {
      id: '1',
      message: 'New project assigned to you.',
      type: 'info',
      isRead: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      message: 'Your task is due today.',
      type: 'warning',
      isRead: false,
      timestamp: new Date(),
    },
    {
      id: '3',
      message: 'Server maintenance scheduled for tonight.',
      type: 'error',
      isRead: false,
      timestamp: new Date(),
    },
  ];

  constructor() {}

  // Fetch all notifications
  getNotifications(): Observable<Notification[]> {
    return of(this.notifications); 
  }

  // Mark a notification as read
  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.isRead = true;
    }
  }

  // Dismiss a notification
  dismissNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(
      (n) => n.id !== notificationId
    );
  }
}
