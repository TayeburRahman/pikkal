"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { X, CheckCircle } from 'lucide-react';
import Cookies from 'js-cookie';

const ClientIDPopup = ({ client_name, client_id, onClose }) => {
  const [inputClientId, setInputClientId] = useState('');
  const router = useRouter();

  const handleClientIdChange = (e) => {
    setInputClientId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (inputClientId === 'pikkal') {
      toast.success('Key verified successfully.');
      Cookies.set('clientToken', client_id, { expires: 2 / 1440 });
      router.push(`/${client_name}/report/${client_id}`);
      onClose();
    } else {
      toast.error('Incorrect Key. Please try again.')
    }
  };

  return (
    <>

      <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full mx-4 relative">
          <X className="absolute top-2 right-2 h-6 w-6 cursor-pointer" onClick={onClose} />
          <h2 className="text-slate-800 text-xl font-semibold mb-4">Verification</h2>
          <p className="text-slate-600 text-sm mb-2">Enter your Key to access the Report.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                id="clientId"
                placeholder=""
                value={inputClientId}
                onChange={handleClientIdChange}
                className="shadow-sm appearance-none border border-slate-400 rounded w-full py-3 px-4 text-slate-700 leading-tight outline-none focus:outline-none focus:border-slate-800"
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex items-center">
                <CheckCircle className="mr-2" /> Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientIDPopup;
