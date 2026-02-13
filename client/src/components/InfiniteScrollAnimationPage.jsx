function InfiniteScrollAnimationPage({ stocks }) {
  return (
    <div className="overflow-hidden bg-white-50 flex group">
      <ul className="flex gap-10  text-white py-4 animate-infinite-scroll group-hover:[animation-play-state:paused]">
        {[...stocks, ...stocks].map(
          (
            stock,
            index,
          ) => (
            <li key={index} className="whitespace-nowrap group">
              {stock.id}. 基地 <span className="text-blue-600">
                {stock.territory}
              </span> 由 <span className="text-yellow-300">{stock.guild}</span>
              占領
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
export default InfiniteScrollAnimationPage;
