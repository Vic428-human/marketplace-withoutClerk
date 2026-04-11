import { createFileRoute, useSuspenseQuery } from "@tanstack/react-router";
import axios from "axios";

async function fetchArticles(params) {
  // URLSearchParams 把一個物件轉換成 URL 查詢字串

  //   假設 params = { page: 1, pageSize: 5, tag: "deep-dive" }
  //   那麼 queryString 會是： page=1&pageSize=5&tag=deep-dive
  const queryString = new URLSearchParams({
    page: params.page.toString(),
    pageSize: params.pageSize.toString(),
    ...(params.tag && { tag: params.tag }),
  }).toString();

  const { data } = await axios.get(
    `http://localhost:8080/articles?${queryString}`,
  );
  return data;
}

/** ======================
 * Page Component
 * ====================== */
function ArticlesList(params) {
  return useSuspenseQuery({
    queryKey: ['articles', params],
    queryFn: () => fetchArticles(params),
  });
}

export default ArticlesList;

export const Route = createFileRoute("/ArticlesList")({
  component: ArticlesList,
});
