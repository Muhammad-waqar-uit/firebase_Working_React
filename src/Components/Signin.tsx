import React, { MouseEvent,ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Auth,provider} from "../../utils/Firebase";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [profileDetails, setDetails] = useState({
    Username: '',
    Password: '',
  });

  const validateEmail = (email: string) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };


  const SignInwithGoogle = () => {
    setLoading(true);
    signInWithPopup(Auth, provider)
      .then((result) => {
        setLoading(false);
        navigate("/home")
        console.log(result);
        const user = result.user;
        if (user) {
          const name = user.displayName || '';
          const email = user.email || '';
          const profilePic = user.photoURL || '';
          localStorage.setItem("Name", name);
          localStorage.setItem("Email", email);
          localStorage.setItem("ProfilePic", profilePic);
        } else {
          console.error("User information not available.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    // Check if both fields are filled
    setIsFormValid(profileDetails.Username.trim() !== "" &&
    profileDetails.Password.trim() !== ""  );
  }, [profileDetails]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    // Check email validation with a 6-second delay when email field changes
    if (profileDetails.Username) {
      // Clear existing timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to validate email after 6 seconds
      timeoutId = setTimeout(() => {
        const isValid = validateEmail(profileDetails.Username);
        setEmailError(isValid ? false : true);
      }, 6000);
    }

    return () => {
      // Cleanup: clear the timeout when the component unmounts or when the email field changes
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [profileDetails.Username]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin =(e:MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(Auth,profileDetails.Username,profileDetails.Password).then((data)=>{
        console.log("AuthData",data);
        navigate("/home");
        setLoading(false);
    }).catch((err)=>{
            toast.error(err, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        });
  }
  return (
    <React.Fragment>
      <div className="bg-slate-100 h-screen flex flex-col justify-center items-center">
        <div className="text-2xl font-semibold mb-4">Sign In</div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''}`}
              id="username"
              name="Username"
              type="text"
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {emailError && <p className='text-red-400 text-sm'>Email is not in a valid format</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="Password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-300"
              type="submit"
              disabled={!isFormValid || emailError}
              onClick={handleSignin}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </div>
        </form>
        <button className='bg-blue-500 hover:bg-blue-700 text-white
         font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
         onClick={SignInwithGoogle}
         >
          <img src="google.png" className='h-3 w-3' alt='googleLogo' />
          {loading ? 'Loading...' : 'Sign In with Google'}</button>
      </div>
      <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
        />
    </React.Fragment>
  );
};

export default SignIn;
