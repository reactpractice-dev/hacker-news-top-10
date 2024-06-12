import { useEffect, useState } from "react";

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
  return articles;
};

const HackerNewsTop10 = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchTop10Articles().then((articles) => {
      setIsLoading(false);
      setArticles(articles);
    });
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <a href={article.url}>{article.title}</a>
                <span>
                  {article.score} by {article.by}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HackerNewsTop10;
