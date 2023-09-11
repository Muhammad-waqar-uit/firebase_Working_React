import  { ChangeEvent,MouseEvent, useEffect, useState } from 'react';
import {Auth} from "../../utils/Firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export const SignUp = () => {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

  const [profileDetails, setDetails] = useState({
    Username: '',
    Password: '',
  });

  const [emailError, setEmailError] = useState(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
    if (profileDetails.Password.length < 8) {
        setError('Password must be at least 8 characters long');
      } else {
        setError('');
      }

    // Clear existing timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to validate email after 6 seconds
    timeoutId = setTimeout(() => {
      handleEmailBlur(profileDetails.Username);
    }, 6000);
  };

  const validateEmail = (email: string) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailBlur = (email: string) => {
    if (email === '') {
      setEmailError(false); // Reset error message when the email field is empty
    } else {
      const isValid = validateEmail(email);
      setEmailError(isValid ? false : true);
    }
  };
  useEffect(() => {
    // Check if both fields are filled
    setIsFormValid(profileDetails.Username.trim() !== "" &&
    profileDetails.Password.trim() !== ""  );
  }, [profileDetails]);

  const handleSubmit =(e:MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(Auth,profileDetails.Username,profileDetails.Password).then((data)=>{
        console.log("AuthData",data);
        navigate("/signin")
        setLoading(false); // Set loading back to false in case of an error
    }).catch((err)=>{
        if(err.code==="auth/weak-password"){
            toast.error('Weak Password', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else if(err.code==="auth/email-already-inuse"){
            toast.error('Use Another Email', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate("/signin")
        }else{
            toast.error('Email Already Exist', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate("/signin")
        }
    });
  }
  
  return (
    <div className="bg-white relative lg:py-20">
      <div className="flex flex-col items-center justify-center pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
          <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Sign up for an account</p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
              <input
                placeholder="123@ex.com"
                type="text"
                name="Username"
                onBlur={() => handleEmailBlur(profileDetails.Username)}
                onChange={handleChange}
                className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${
                  emailError ? 'border-red-500' : ''
                }`}
              />
              {emailError && <p className='text-red-400 text-sm'>{emailError}</p>}
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Password</p>
              <input
                placeholder="Password"
                type="password"
                name="Password"
                onChange={handleChange}
                minLength={8} // Use a numeric value instead of a string
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
              />
              {error && <p className='text-red-400'>Password need to be atleaset 8 digits</p>}
            </div>
            <div className="relative">
              <button className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-green-400 ease disabled:bg-slate-300"   disabled={!isFormValid || emailError}
                onClick={handleSubmit}>  {loading ? 'Loading...' : 'Submit'}
                </button>
            </div>
          </div>
        </div>
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
    </div>
  );
};
