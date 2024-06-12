import { useEffect } from "react";

const fetchTop10Articles = async () => {
  const topArticlesResponse = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const topArticleIds = await topArticlesResponse.json();
  console.log(topArticleIds);
};

const HackerNewsTop10 = () => {
  useEffect(() => {
    fetchTop10Articles();
  }, []);
  return <div>Build your component here!</div>;
};

export default HackerNewsTop10;
