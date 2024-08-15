import './SignUpUser.scss'
import { useEffect, useState } from "react";
import { FormInput, ButtonPrimary } from '../../Components';
import { Link, useNavigate } from 'react-router-dom';

import { supabase } from "../../client";

function SignUpUser() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newUserData, setNewUserData] = useState<any>()

  // console.log('new email set' + email);
  // console.log('new name set' + name);
  // console.log('new password set' + password);

  useEffect(() => {
    addNewUser();
  }, [newUserData]);

  // const handleSignUp = async (event: any) => {
  //   event.preventDefault();
  //   await signUpNewUser();
  //   await addNewUser();
  // }

  async function signUpNewUser(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'http://localhost:3000/',
          data: {
            name: name,
          }
        },
      })
      
      if (error) {
        throw (error)
      } else {
        setNewUserData(data);
      }
    }
    catch (e) {
      console.log("signUpNewUser error is:" + JSON.stringify(e))
      // alert(e);
    }
    setLoading(false);
  }

  async function addNewUser() {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({ user_id: newUserData.user.id, user_name: newUserData.user.user_metadata.name, email: newUserData.user.user_metadata.email })
        .select()

      console.log(data)

      if (error) {
        console.log("addNewUser error is:" + JSON.stringify(error))
        throw (error)
      } else {
        alert("A confirmation message has been sent to your email.")
        navigate("/");
      }
    }
    catch (e) {
      console.log("addNewUser thrown error is:" + JSON.stringify(e))
      // alert(e);
    }
  }

  return (
    <div className='signup__home'>
      <h1>Welcome to ReadThis.</h1>
      <p>Sign up for a new account below.</p>
      <div className='signup__component'>
        <form className="signup__form" onSubmit={signUpNewUser}>
          <FormInput title="Name" type="text" placeholder='John Doe' setValue={setName} />
          <FormInput title="Email" type="text" placeholder='johndoe@example.com' setValue={setEmail} />
          <FormInput title="Password" type="password" setValue={setPassword} />
          <ButtonPrimary type="primary" label='Sign Up' disabled={loading} />
        </form>
      </div>
      <p>Already have an account? <Link to="/">Sign in now.</Link></p>

    </div>
  );
}

export default SignUpUser;
