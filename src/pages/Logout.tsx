import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from local storage
    localStorage.removeItem("token");
    
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">Logging out...</h2>
    </div>
  );
};

export default Logout;
