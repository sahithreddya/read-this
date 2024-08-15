import { useNavigate } from "react-router-dom";
import './ArticleCard.scss'
import { useEffect, useState } from "react";

interface ArticleCardProps {
  article_id: number,
  imageURL: string,
  title: string,
  article_url: string,
  desc: string,
  users: any,
  created_at: string
}


function ArticleCard({ article_id, imageURL, title, article_url, desc, users, created_at }: ArticleCardProps) {

  // let navigate = useNavigate();
  let date = new Date(created_at).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"}) 

  console.log(date);

  useEffect(() => {
    // getOpenGraphdata();
    // handleFetchArticles();
  }, [])

  return (
    <div key={article_id} className="article__container">
      <div className="article__image-container">
      <img className="article__image" src={imageURL} alt="article" />
      </div>
      <div className="article__content">
        <div className="article__header">
          <p className="article__title">{title}</p>
          <p className="article__url">{article_url}</p>
        </div>
        <div className="article__description">
          <p className="">{desc}</p>
        </div>
        <div className="article__user">
          <p className="">shared by {users.user_name} on {date}</p>
        </div>
      </div>
    </div>

  );
}

export default ArticleCard;
