import { createFileRoute } from "@tanstack/react-router";

/** ======================
 * Page Component
 * ====================== */
function ArticlesList() {
  return (
    <div>
      <h1>文章列表</h1>
      {/* 這裡放文章清單 */}
    </div>
  );
}

export default ArticlesList;

export const Route = createFileRoute("/ArticlesList")({
  component: ArticlesList,
});
