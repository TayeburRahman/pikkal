import React, { useState } from 'react';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const PasswordPopup = ({ onAccessGranted, client = null }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (client) {

      const passKey = client["MANUAL_PASSKEY"]?.toString().trim() ?? "";
      const recordId = client["Record_ID"]?.toString().trim() ?? "";

      if (!passKey) {
        if (password === recordId) {
          toast.success('Access granted.');
          Cookies.set('accessGranted', 'true'); // session cookie
          onAccessGranted(true);
        } else {
          toast.error('Incorrect password. Please try again.');
        }
      } else {
        if (password === passKey) {
          toast.success('Access granted.');
          Cookies.set('accessGranted', 'true'); // session cookie
          onAccessGranted(true);
        } else {
          toast.error('Incorrect password. Please try again.');
        }
      }

    } else if (password === "pikkal") {
      toast.success('Access granted.');
      Cookies.set('accessGranted', 'true'); // session cookie
      onAccessGranted(true);
    } else {
      toast.error('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 relative">
        <h2 className="text-slate-800 text-xl font-semibold mb-4">Password Required</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none"
            placeholder="Enter password"
          />
          <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded focus:outline-none">
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default PasswordPopup;
