import React from 'react';

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

const LoginForm = ({ onSwitchToSignUp }: LoginFormProps) => {
  return (
    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <div className="mt-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl xl:text-3xl font-extrabold">
          Login
        </h1>
        <div className="w-full flex-1 mt-8">
          <div className="mx-auto max-w-xs">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email" placeholder="Email" />
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              type="password" placeholder="Password" />
            <button
              className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">
                Login
              </span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Not a member yet?{' '}
              <button 
                onClick={onSwitchToSignUp}
                className="border-b border-gray-500 border-dotted hover:text-indigo-500 hover:border-indigo-500">
                Click to sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 