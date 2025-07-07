import { useQuery } from "@tanstack/react-query";

const HackerNewsTop10 = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topStories"],
    queryFn: async () => {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return (
    <ul>
      {data?.slice(0, 10).map((id: number) => (
        <li key={id}>
          <a
            href={`https://news.ycombinator.com/item?id=${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {id}
          </a>
        </li>
      ))}
      {isLoading && <li>Loading...</li>}
      {error && <li>Error loading data: {error.message}</li>}
      {data && data.length === 0 && <li>No stories found.</li>}
    </ul>
  );
};

export default HackerNewsTop10;
