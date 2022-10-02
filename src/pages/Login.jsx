import signInWithGoogle from '../assets/images/google_signin.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { firebaseControlled, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(firebaseControlled, userId);
    if (firebaseControlled && userId) {
      navigate('/my-projects');
    }
  }, [firebaseControlled, userId, navigate]);
  const auth = getAuth();
  const signIn = async () => {
    try {
      const user = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(user, 'user');
    } catch (e) {
      // Most of the errror here are user errors
    }
  };
  return (
    <>
      <div className="row mt-3">
        <div className="col">
          <h1>Login</h1>
          <p>Email login coming soon!</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img
            src={signInWithGoogle}
            onClick={signIn}
            alt="sign in with google button"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
