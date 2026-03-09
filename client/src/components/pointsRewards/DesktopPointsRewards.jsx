import { useMemo } from "react";

export default function DesktopPointsRewards({ className = "", progress }) {
  const {
    milestonesUI = [],
    topPadPct,
    bottomPadPct,
    barWidth,
    fillStyle,
    unitLabel,
  } = progress ?? {};

  const milestonesForRewards = useMemo(() => {
    return [...milestonesUI].sort((a, b) => b.points - a.points);
  }, [milestonesUI]);

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
              className="h-full w-full object-contain"
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
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#9a6a4d]/70"
          style={{
            top: `${topPadPct}%`,
            bottom: `${bottomPadPct}%`,
            width: `${barWidth}px`,
          }}
        />

        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#7bb46a] transition-[height] duration-500"
          style={{
            ...fillStyle,
            width: `${barWidth}px`,
          }}
        />

        {milestonesUI.map((m) => (
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
                    "h-[64px] w-[64px] object-contain select-none",
                    m.reached ? "" : "opacity-70 grayscale-[20%]",
                  ].join(" ")}
                  draggable={false}
                />

                <div className="-mt-2 flex items-baseline leading-none">
                  <div
                    className={[
                      "text-2xl font-extrabold",
                      m.reached ? "text-red-500" : "text-[#d1853f]",
                    ].join(" ")}
                  >
                    {m.points}
                  </div>
                  <div className="ml-[2px] text-sm font-semibold text-[#d1853f]">
                    {unitLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

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
            {milestonesForRewards.map((m) => {
              if (!m.reward) return null;

              return (
                <RewardCard
                  key={m.reward.rewardId}
                  reward={m.reward}
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
