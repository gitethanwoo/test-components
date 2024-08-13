import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Notification } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onOpenChange, notifications, onNotificationClick }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Immediate Needs</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {notifications.length === 0 ? (
            <p>No immediate needs at this time.</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className="mb-2 last:mb-0">
                  <Button 
                    variant="ghost" 
                    className={`w-full text-left ${notification.isRead ? 'text-gray-500' : 'text-black'}`} 
                    onClick={() => onNotificationClick(notification)}
                  >
                    <span className="font-semibold">{notification.client}</span>: {notification.need}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;