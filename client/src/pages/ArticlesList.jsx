import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import axios from "axios";
import { useSuspenseQuery } from "@tanstack/react-query";

async function fetchArticles(params) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  const searchParams = new URLSearchParams();
  searchParams.set("page", page.toString());
  searchParams.set("pageSize", pageSize.toString());

  (params.tags ?? []).forEach((tag) => {
    searchParams.append("tag", tag);
  });

  const url = `http://localhost:8081/articles?${searchParams.toString()}`;
  console.log("fetchArticles params:", params);
  console.log("fetchArticles url:", url);

  const { data } = await axios.get(url);
  return data;
}

const TAGS = [
  { id: "beginner-friendly", label: "#BeginnerFriendly" },
  { id: "deep-dive", label: "#DeepDive" },
  { id: "practical", label: "#Practical" },
  { id: "easy-to-understand", label: "#EasyToUnderstand" },
];

function ArticlesList() {
  const search = useSearch({ from: "/ArticlesList" });
  const selectedTags = search.tags || [];

  const articlesQuery = useSuspenseQuery({
    queryKey: ["articles", search],
    queryFn: () => fetchArticles(search),
  });

  return (
    <div className="articles-page">
      <div className="tags-filter p-4 border-b">
        <Link
          to="/ArticlesList"
          search={(prev) => ({ ...prev, tags: [], page: 1 })}
          className={`mr-2 px-3 py-1 rounded ${
            selectedTags.length === 0
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          全部
        </Link>

        {TAGS.map((tag) => {
          const active = selectedTags.includes(tag.id);

          return (
            <Link
              key={tag.id}
              to="/ArticlesList"
              search={(prev) => {
                const prevTags = prev.tags || [];
                const nextTags = prevTags.includes(tag.id)
                  ? prevTags.filter((t) => t !== tag.id)
                  : [...prevTags, tag.id];

                return { ...prev, tags: nextTags, page: 1 };
              }}
              className={`mr-2 px-3 py-1 rounded ${
                active ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {tag.label}
            </Link>
          );
        })}
      </div>

      <div className="articles-list p-4">
        <p className="mb-4">
          篩選：{selectedTags.join(", ") || "all"} | 總數：{articlesQuery.data?.totalCount || 0}
        </p>

        {articlesQuery.data?.items?.map((article) => (
          <div key={article.id} className="article-card border p-4 mb-4 rounded">
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesList;

export const Route = createFileRoute("/ArticlesList")({
  validateSearch: (search) => ({
    page: Number(search.page || 1),
    tags: Array.isArray(search.tags) ? search.tags : [],
  }),
  component: ArticlesList,
});