import './SignInUser.scss'
import { useEffect, useState } from "react";
import { FormInput, ButtonPrimary } from '../../Components';
import { Link, useNavigate } from 'react-router-dom';

import { supabase } from "../../client";

function SignInUser({setToken}: any) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    // signInUser();
    console.log('new email set' + email);
  }, []);

  async function signInUser(e: any) {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        throw error;
        // switch (error.name) {
        //   case "AuthApiError":
        //     alert("Invalid login credentials. Please try again.")

        // }
        // console.log(JSON.stringify(error))
        console.log(data)
        console.log(error)
      } else {
        console.log(data)
        setToken(data)
        alert('You\'ve successfully signed in.')

        navigate("/home");
      }
    }
    catch (e: any) {
      // console.log(JSON.stringify(e))
      alert(e);
    }

    setLoading(false)
  }

  return (
    <div className='signin__home'>
      <h1>Welcome to ReadThis.</h1>
      <p>Sign in below.</p>
      <div className='signin__component'>
        <form className="signin__form" onSubmit={signInUser}>
          <FormInput title="Email" type="text" placeholder='johndoe@example.com' setValue={setEmail} />
          <FormInput title="Password" type="password" setValue={setPassword} />
          <ButtonPrimary type="primary" label='Sign In' loading={loading} />
        </form>
      </div>
      <p>Don't have an account? <Link to="/signup">Sign up now.</Link></p>
    </div>
  );
}

export default SignInUser;
