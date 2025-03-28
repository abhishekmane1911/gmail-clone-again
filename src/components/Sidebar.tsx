import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Inbox, Star, Send, File, Trash, Edit } from 'lucide-react';

function Sidebar({ onCompose }: { onCompose: () => void }) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-[calc(100vh-64px)] bg-white border-r">
      <button
        onClick={onCompose}
        className="flex items-center gap-2 m-4 px-6 py-4 rounded-full shadow-md bg-blue-100 hover:shadow-lg transition-shadow"
      >
        <Edit size={20} />
        <span>Compose</span>
      </button>
      
      <nav className="mt-4">
        <Link 
          to="/inbox" 
          className={`flex items-center gap-4 px-6 py-2 ${
            isActive('/inbox') || isActive('/') 
              ? 'text-blue-600 bg-blue-50 rounded-r-full' 
              : 'hover:bg-gray-100'
          }`}
        >
          <Inbox size={20} />
          <span>Inbox</span>
        </Link>
        <Link 
          to="/starred" 
          className={`flex items-center gap-4 px-6 py-2 ${
            isActive('/starred') 
              ? 'text-blue-600 bg-blue-50 rounded-r-full' 
              : 'hover:bg-gray-100'
          }`}
        >
          <Star size={20} />
          <span>Starred</span>
        </Link>
        <Link 
          to="/sent" 
          className={`flex items-center gap-4 px-6 py-2 ${
            isActive('/sent') 
              ? 'text-blue-600 bg-blue-50 rounded-r-full' 
              : 'hover:bg-gray-100'
          }`}
        >
          <Send size={20} />
          <span>Sent</span>
        </Link>
        <Link 
          to="/drafts" 
          className={`flex items-center gap-4 px-6 py-2 ${
            isActive('/drafts') 
              ? 'text-blue-600 bg-blue-50 rounded-r-full' 
              : 'hover:bg-gray-100'
          }`}
        >
          <File size={20} />
          <span>Drafts</span>
        </Link>
        <Link 
          to="/trash" 
          className={`flex items-center gap-4 px-6 py-2 ${
            isActive('/trash') 
              ? 'text-blue-600 bg-blue-50 rounded-r-full' 
              : 'hover:bg-gray-100'
          }`}
        >
          <Trash size={20} />
          <span>Trash</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;