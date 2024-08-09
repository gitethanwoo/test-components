import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Smile } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  recipientName: string;
}

export function MessageModal({ isOpen, onClose, onSend, recipientName }: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  const handleSend = () => {
    onSend(message);
    setMessage('');
    onClose();
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Message to {recipientName}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="message" className="text-sm font-medium">Your Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Write your message to ${recipientName} here...`}
            className="mt-2 resize-none"
            rows={4}
            maxLength={maxChars}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-500">
              {charCount}/{maxChars} characters
            </div>
            <div className="flex space-x-2">
              {['😊', '👍', '❤️', '🎉'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-xl hover:bg-gray-100 rounded-full p-1 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!message.trim()} 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}