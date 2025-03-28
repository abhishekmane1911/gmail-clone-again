import React, { useState } from 'react';
import { X, Minimize2, Maximize2, Send } from 'lucide-react';

interface ComposeProps {
  onClose: () => void;
}

function Compose({ onClose }: ComposeProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [email, setEmail] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(email),
      });
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-24 w-[500px] bg-white rounded-t-lg shadow-xl ${
        isMinimized ? 'h-[40px]' : 'h-[500px]'
      }`}
    >
      <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
        <span>New Message</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100%-40px)]">
          <input
            type="email"
            placeholder="To"
            value={email.to}
            onChange={(e) => setEmail({ ...email, to: e.target.value })}
            className="px-4 py-2 border-b outline-none"
          />
          <input
            type="text"
            placeholder="Subject"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            className="px-4 py-2 border-b outline-none"
          />
          <textarea
            placeholder="Compose email"
            value={email.body}
            onChange={(e) => setEmail({ ...email, body: e.target.value })}
            className="flex-1 px-4 py-2 outline-none resize-none"
          />
          <div className="p-4 border-t">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Compose;