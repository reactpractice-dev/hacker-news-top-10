import { useQuery } from "@tanstack/react-query";

type HackerNewsArticle = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

const fetchTop10ArticlesWithDetails = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const top10Ids = data.slice(0, 10);
  const articlesWithDetails = await Promise.all(
    top10Ids.map(async (id: number) => {
      const articleResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      if (!articleResponse.ok) {
        throw new Error("Network response was not ok");
      }
      return articleResponse.json();
    })
  );

  return articlesWithDetails;
};

const HackerNewsTop10 = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTop10ArticlesWithDetails,
  });
  return (
    <>
      <h1>Hacker News Top 10 Articles</h1>
      <ul>
        {data?.map((article: HackerNewsArticle) => (
          <li key={article.id}>
            <a
              href={`https://news.ycombinator.com/item?id=${article.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.title}
            </a>
            <br />
            <span>
              by {article.by} - {article.score} points
            </span>
          </li>
        ))}
        {isLoading && <li>Loading...</li>}
        {error && <li>Error loading data: {error.message}</li>}
        {data && data.length === 0 && <li>No stories found.</li>}
      </ul>
    </>
  );
};

export default HackerNewsTop10;
