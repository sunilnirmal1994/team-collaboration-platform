export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    isRead: boolean;
    timestamp: Date;
  }
  