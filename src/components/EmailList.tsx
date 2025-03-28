import React, { useEffect, useState } from 'react';
import { Star, Trash, Mail } from 'lucide-react';
import { format } from 'date-fns';

interface Email {
  id: number;
  from: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
}

function EmailList() {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/emails', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => res.json())
      .then(data => setEmails(data));
  }, []);

  return (
    <div className="bg-white">
      {emails.map(email => (
        <div
          key={email.id}
          className={`flex items-center px-4 py-2 border-b hover:shadow-md cursor-pointer ${
            !email.read ? 'font-semibold bg-blue-50' : ''
          }`}
        >
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Star
              size={20}
              className={email.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}
            />
          </button>
          <div className="flex-1 min-w-0 ml-2">
            <div className="flex items-center">
              <span className="truncate">{email.from}</span>
              <span className="ml-auto text-sm text-gray-500">
                {format(new Date(email.date), 'MMM d')}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="truncate">{email.subject}</span>
              <span className="ml-2 truncate text-sm">- {email.body}</span>
            </div>
          </div>
          <div className="flex ml-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Trash size={20} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Mail size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmailList;