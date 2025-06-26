// // src/Login.jsx
// // import React from 'react';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// const Login = () => {
//     const handleLogin = async () => {
//     try {
//       const auth = getAuth();
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Google login failed. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="relative flex min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
//       style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}
//     >
//       <div className="flex items-center bg-slate-50 p-4 pb-2 justify-between">
//         <div className="text-[#0e141b] flex size-12 shrink-0 items-center">
//           {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
//             <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
//           </svg> */}
//         </div>
//       </div>

//       <div className="container mx-auto px-4">
//         <div className="p-4">
//           <div
//             className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
//             style={{
//               backgroundImage:
//                 "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://cdn.usegalileo.ai/sdxl10/5468e69f-77be-46b4-9d5f-e43b72ebe720.png')",
//             }}
//           >
//             <div className="flex flex-col gap-2 text-center">
//               <h1 className="text-white text-4xl font-black leading-tight tracking-tight" style={{fontSize: '3rem'}}>
//                 Welcome!
//               </h1>

//             </div>
//           </div>
//         </div>

//         <div
//   style={{
//     marginTop: '40px',
//     marginBottom: '40px',
//     marginLeft: '400px',
//     marginRight: '400px',
//   }}
// >
//   <button
//     onClick={handleLogin}
//     style={{
//       width: '100%',
//       height: '64px',                  // equivalent to Tailwind's h-16
//       borderRadius: '1rem',            // rounded corners
//       backgroundColor: '#e7edf3',
//       color: '#0e141b',
//       fontSize: '1.125rem',            // ~18px, similar to text-lg
//       fontWeight: '800',               // bold text
//       letterSpacing: '0.05em',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem',
//       transition: 'background-color 0.3s ease',
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//       padding: '0 1.5rem',
//       cursor: 'pointer',
//     }}
//     onMouseOver={(e) => {
//       e.currentTarget.style.backgroundColor = '#d6dee6';
//     }}
//     onMouseOut={(e) => {
//       e.currentTarget.style.backgroundColor = '#e7edf3';
//     }}
//   >
//     <span>Login with Google</span>
//   </button>
// </div>


//       </div>
//     </div>
//   );
// };

// export default Login;


import React from 'react';

const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.png')" }} 
    >
      <div className="flex bg-white w-full max-w-[1224px] h-[804px] mx-auto my-10 rounded-xl shadow-lg overflow-hidden">
        {/* Left Panel */}
        <div className="w-3/5 h-full p-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/welcome.png')" }}>
          <h1 className="text-4xl font-inria text-white mb-6">Welcome to NetSeva</h1>
          <p className="text-white text-lg">
            NetSeva crowdsources mobile network data to create an open, transparent view of connectivity across India. By contributing speed tests, users help improve coverage insights for all telecom providers.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-2/5 p-10 h-full flex flex-col justify-center">
          <h2 className="text-3xl font-serif text-[#170056] mb-6 text-center">Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            className="border border-black bg-[#EDEFFE] px-4 py-3 rounded mb-4 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-black bg-[#EDEFFE] px-4 py-3 rounded mb-4 focus:outline-none"
          />
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="text-[#170056]">Forgot Password</a>
          </div>
          <button className="bg-[#E3423F] text-white py-3 rounded mb-4">Sign In</button>
          <button className="border border-black bg-[#EDEFFE] text-gray-600 py-3 rounded mb-4">Login With Google</button>
          <p className="text-center text-gray-600">
            Don’t have an account? <a href="#" className="text-red-500">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
