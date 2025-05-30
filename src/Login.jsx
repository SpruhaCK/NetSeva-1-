// src/Login.jsx
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const handleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}
    >
      <div className="flex items-center bg-slate-50 p-4 pb-2 justify-between">
        <div className="text-[#0e141b] flex size-12 shrink-0 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://cdn.usegalileo.ai/sdxl10/5468e69f-77be-46b4-9d5f-e43b72ebe720.png')",
            }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black leading-tight tracking-tight">
                Welcome back
              </h1>
              <h2 className="text-white text-sm md:text-base font-normal">
                Log in to your account.
              </h2>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-3 px-4 py-3">
          <input
            type="email"
            placeholder="Email"
            className="form-input w-full rounded-xl bg-[#e7edf3] text-[#0e141b] placeholder-[#4e7397] h-14 p-4 text-base font-normal leading-normal focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input w-full rounded-xl bg-[#e7edf3] text-[#0e141b] placeholder-[#4e7397] h-14 p-4 text-base font-normal leading-normal focus:outline-none"
          />

          <p className="text-[#4e7397] text-sm underline">Forgot password?</p>

          <button className="w-full h-12 rounded-xl bg-[#1980e6] text-white font-bold tracking-wide">
            Log in
          </button>

          <button
            onClick={handleLogin}
            className="w-full h-12 rounded-xl bg-[#e7edf3] text-[#0e141b] font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-[#d6dee6] transition"
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
            </svg>
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;