import React from "react";
import { Menu, Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <div className="flex items-center">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Menu size={20} />
        </button>
        <img
          src="https://www.google.com/gmail/about/static-2.0/images/logo-gmail.png?fingerprint=c2eaf4aae389c3f885e97081bb197b97"
          alt="Gmail"
          className="h-8 ml-4"
        />
      </div>
      <div className="flex-1 max-w-2xl mx-4">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search mail"
            className="ml-2 bg-transparent outline-none flex-1"
          />
        </div>
      </div>
      
      <div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings size={20} />
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/logout")} className="text-red-500 bg-red-100 p-3 rounded-xl hover:bg-red-200">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
