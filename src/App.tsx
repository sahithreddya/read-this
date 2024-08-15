import { SignInUser, SignUpUser, HomePage } from './pages';

import {
  Routes,
  Route
} from "react-router-dom";

import './App.scss';
import { useEffect, useState } from "react";

import { supabase } from "./client";

function App() {

  const [token, setToken] = useState(false)
 
  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    // getArticles();
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token') || '{}')
      setToken(data);
    }
  }, []);

  async function getArticles() {
    const { data } = await supabase.from("Articles").select();
    // setArticles(data);
  }

  return (
    <div className='app--container'>
      {/* <ul>
        {articles.map((article: any) => (
          <li key={article.article_id}>{article.article_title}</li>
        ))}
      </ul> */}
      <Routes>
        <Route path="/" element={<SignInUser setToken={setToken} />} />
        {token ? <Route path="/home" element={<HomePage token={token}/>} /> : ""}
        <Route path="/signup" element={<SignUpUser />} />
      </Routes>
    </div>
  );
}

export default App;
