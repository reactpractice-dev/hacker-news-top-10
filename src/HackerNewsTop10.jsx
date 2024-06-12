import { useEffect } from "react";

const fetchArticleDetails = async (articleId) => {
  const articleResponse = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${articleId}.json`
  );
  return articleResponse.json();
};

const fetchTop10Articles = async () => {
  const topArticlesResponse = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const topArticleIds = await topArticlesResponse.json();
  const top10Articles = topArticleIds.slice(0, 10);

  const articles = await Promise.all(
    top10Articles.map((articleId) => fetchArticleDetails(articleId))
  );
  console.log(articles);
};

const HackerNewsTop10 = () => {
  useEffect(() => {
    fetchTop10Articles();
  }, []);
  return <div>Build your component here!</div>;
};

export default HackerNewsTop10;
