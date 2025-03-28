import { useState } from "react";

export default function ForgotPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password link sent to:", email);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-500">
          <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
        </div>
      </div>
    </div>
  );
}