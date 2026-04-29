/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.error('This browser does not support notifications.');
    return 'unsupported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
};

export const sendNotification = (title: string, options?: NotificationOptions) => {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    // If a service worker is registered, we should use it to show the notification
    // to ensure it works in the background.
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          icon: '/logo.png', // Assuming a logo exists or using a default
          badge: '/logo.png',
          ...options,
        });
      });
    } else {
      // Fallback to standard Notification for foreground
      new Notification(title, options);
    }
  }
};

export const simulateOrderStatusChange = (orderId: string, status: string) => {
  const statusMessages: Record<string, string> = {
    'Ready for Delivery': `Your order #${orderId} is packed and ready for delivery! 🚚`,
    'Delivered': `Success! Your laundry #${orderId} has been delivered. Thank you! ✨`,
    'Processing': `We've started washing your clothes for order #${orderId}. 🧼`,
    'New Assignment': `A new delivery task has been assigned to you. 📦`,
  };

  const body = statusMessages[status] || `Status update for order #${orderId}: ${status}`;
  
  const options: any = {
    body,
    vibrate: [200, 100, 200],
    tag: `order-${orderId}`,
    renotify: true,
  };

  sendNotification('Perfect Wash Update', options);
};
