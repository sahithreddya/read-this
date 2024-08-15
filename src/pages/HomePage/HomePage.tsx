import { useNavigate } from "react-router-dom";
import { ButtonPrimary, FormInput, ArticleCard } from "../../Components";
import './HomePage.scss'
import { supabase } from "../../client";
import axios from "axios";
import { useEffect, useState } from "react";


function HomePage({ token }: any) {

  let navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<any>([])
  const [newArticleLink, setNewArticleLink] = useState()
  const [userData, setUserData] = useState(JSON.parse(sessionStorage?.getItem('token') || '{}'));

  useEffect(() => {
    handleFetchArticles();
  }, []);


  return (
    <div className="home__container">
      <div className="home__navbar">
        <h1 className="navbar__logo">ReadThis.</h1>
        <div className="home__logout">
          <ButtonPrimary label="Logout" type="secondary" onClick={handleLogout} />
        </div>
      </div>
      <div className="home__body__container">
        <h4>Hello, {userData.user.user_metadata.name}.</h4>
        <div className="body__article__container">
          {articles?.map((article: any) => (
            <ArticleCard key={article.article_id} {...article} />
          ))}
        </div>
        <div className="home__addNewArticle">
          <FormInput placeholder="Paste article link" type="text" setValue={setNewArticleLink} />
          <ButtonPrimary label="Add new article" type="primary" onClick={handleAddArticle} disabled={loading} />
        </div>
      </div>
    </div>
  );

  function handleLogout(e: any) {
    sessionStorage.removeItem('token');
    navigate("/");

    alert("You've successfully logged out.")

  }

  function getOpenGraphdata(url): any {
    let key = process.env.OPENGRAPH_KEY;
    return axios.get(
      `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?${key ? key : ""}`
    )
  }

  async function handleAddArticle() {
    setLoading(true);
    // let tempData = {
    //   title: "The Psychology of Fonts: How to Choose Fonts That Evoke Emotion",
    //   desc: "Designers have used powerful fonts to give designs a certain mood and feel for decades.If you want to create designs that connect, here's how to use the psychology of fonts to evoke emotion through your work.",
    //   imageURL: "https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=75,format=auto,fit=crop,height=630/uploads/sites/2/2023/02/Screen-Shot-2024-02-08-at-8.40.48-am.png",
    // }
    articles.map((article: any) => {
      if (article.url === newArticleLink) {
        alert("Article already exists")
        return;
      }
      else {
        console.log(newArticleLink);
      }
    });

    const openGraphdata = await getOpenGraphdata(newArticleLink);
    await addNewArticle(openGraphdata?.data?.hybridGraph?.title, openGraphdata?.data?.hybridGraph?.description, openGraphdata?.data?.hybridGraph?.image);
    // await addNewArticle(tempData.title, tempData.desc, tempData.imageURL);

    setLoading(false);
  }

  async function addNewArticle(title, desc, imageURL) {
    try {
      if (title && imageURL) {
        const { data, error } = await supabase
          .from('articles')
          .insert({ title: title, desc: desc, imageURL: imageURL, article_url: newArticleLink, user_id: userData.user.id })
          .select(
            `*,
            users(user_id, user_name)`
          )

        console.log(data)

        if (error) {
          console.log("addNewArticle error is:" + JSON.stringify(error))
          throw (error)
        } else {
          let arrData = [...articles];
          arrData.push(data[0]);
          setArticles(arrData);
          // alert("New article added successfully")
        }
      }
    }
    catch (e) {
      console.log("addNewUser thrown error is:" + JSON.stringify(e))
    }
  }

  async function handleFetchArticles() {
    setLoading(true);
    const { data, error } = await supabase.from('articles').select(`
        *,
        users(user_id, user_name)
        `)
      .order('created_at', { ascending: false })

    if (error) {
      console.log(JSON.stringify(error))
      console.log(data)
    } else {
      setArticles(data);
      console.log(data);
      setLoading(false);
    }
  }


}

export default HomePage;
