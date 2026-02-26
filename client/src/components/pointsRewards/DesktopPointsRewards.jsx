export default function DesktopPointsRewards({
  className = "",
  program,
  model,
}) {

  /* 假設：
  program.rewards = [
  { milestonePoints: 100, title: "A" },
  { milestonePoints: 300, title: "B" },
];
那 Map 會變成： 結構優化 > 效能優化
把 reward 陣列轉成「用 milestonePoints 快速查找的資料結構」，
讓每個 milestone 可以直接找到對應 reward。
現在 milestonePoints 筆數不多不明顯，但將來積分門檻數量一多，效能就節省了 O(1) 查 reward，避免每次 find
Map {
  100 => { milestonePoints: 100, title: "A" },
  300 => { milestonePoints: 300, title: "B" }
}
   */
  const rewardsByPoints = new Map(
    (program?.rewards || []).map((r) => [Number(r.milestonePoints), r]),
  );

  function RewardCard({ reward, reached }) {
    return (
      <button
        type="button"
        className={["w-[100px]", reached ? "" : "opacity-80"].join(" ")}
        onClick={() => {}}
      >
        <div
          className="relative w-full aspect-144/136 bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage:
              "url(https://roworld.gnjoy.hk/mlktwgh/png/award-450-bg-829c2483.png)",
          }}
        >
          <div className="absolute inset-[10%]">
            <img
              src={reward?.preview?.imageUrl}
              alt={reward?.title || ""}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </button>
    );
  }
  return (
    <div
      className={`
        ${className}
        relative w-full aspect-[1536/845]
        bg-[url('https://roworld.gnjoy.hk/mlktwgh/png/bg-bbb27a79.png')]
        bg-no-repeat bg-center bg-contain
      `}
      style={{
        "--bar-x": "18%",
        "--bar-top": "20%",
        "--bar-bottom": "22%",
      }}
    >
      <div
        className="
          absolute left-[var(--bar-x)] top-[var(--bar-top)] bottom-[var(--bar-bottom)]
          -translate-x-1/2 w-[180px] z-10 pointer-events-none
        "
      >
        {/* bar */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#9a6a4d]/70"
          style={{
            top: `${model.topPadPct}%`,
            bottom: `${model.bottomPadPct}%`,
            width: `${model.barWidth}px`,
          }}
        />

        {/* fill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#7bb46a] transition-[height] duration-500"
          style={{
            ...model.fillStyle,
            width: `${model.barWidth}px`,
          }}
        />

        {/* milestones */}
        {model.milestonesUI.map((m) => (
          <div
            key={m.key}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${m.topPct}%` }}
          >
            <div className="relative flex items-center">
              <div className="flex flex-col items-center">
                <img
                  src={m.iconUrl}
                  alt=""
                  className={[
                    "w-[64px] h-[64px] object-contain select-none",
                    m.reached ? "" : "opacity-70 grayscale-[20%]",
                  ].join(" ")}
                  draggable={false}
                />

                <div className="-mt-2 flex items-baseline leading-none">
                  <div
                    className={[
                      "text-2xl font-extrabold",
                      m.reached ? " text-red-500" : "text-[#d1853f]",
                    ].join(" ")}
                  >
                    {m.points}
                  </div>
                  <div className="ml-[2px] text-sm font-semibold text-[#d1853f]">
                    {program?.points?.unitLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* rewards column */}
        <div
          className="
            absolute
            left-[var(--bar-x)]
            translate-x-[100px]
            flex flex-col justify-between
            w-[160px]
            pointer-events-auto
          "
        >
          <div className="flex flex-col gap-4">
            {model.milestonesUI
              .slice()
              .sort((a, b) => b.points - a.points)
              .map((m) => {
                const reward = rewardsByPoints.get(Number(m.points));
                if (!reward) return null;

                return (
                  <RewardCard
                    key={reward.rewardId}
                    reward={reward}
                    reached={m.reached}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
