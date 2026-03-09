// components/pointsRewards/MobilePointsRewards.jsx
export default function MobilePointsRewards({ progress }) {
  const {
    pointsNow,
    unitLabel,
    leftPadPct,
    rightPadPct,
    fillPct,
    milestonesMobileUI,
  } = progress;

  return (
    <div>
      <div className="px-2 pt-2">
        {/* rewards row */}
        <div className="flex items-start justify-center gap-3">
          {milestonesMobileUI.map((m) => (
            <div key={m.key} className="flex flex-col items-center">
              <button
                type="button"
                className="w-[86px] rounded-xl border border-black/10 bg-white/90 px-2 py-2"
              >
                <img
                  src={m.rewardImageUrl}
                  alt={m.rewardTitle || ""}
                  className="mx-auto h-10 w-10 rounded-lg bg-black/5 object-cover"
                />
                <div className="mt-1 text-[11px] font-semibold text-black/70">
                  查看獎勵
                </div>
              </button>

              <div className="mt-2 flex items-baseline">
                <div className="text-[14px] font-extrabold text-[#d1853f]">
                  {m.points}
                </div>
                <div className="ml-1 text-[12px] font-semibold text-[#d1853f]">
                  {unitLabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* progress bar */}
        <div className="mt-3">
          <div className="relative h-6 w-full">
            <div
              className="absolute top-1/2 -translate-y-1/2 rounded-full bg-[#9a6a4d]/70"
              style={{
                left: `${leftPadPct}%`,
                right: `${rightPadPct}%`,
                height: "10px",
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 rounded-full bg-[#7bb46a] transition-[width] duration-500"
              style={{
                left: `${leftPadPct}%`,
                width: `${fillPct}%`,
                height: "10px",
              }}
            />

            {milestonesMobileUI.map((m) => (
              <div
                key={`${m.key}-icon`}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${m.leftPct}%` }}
              >
                <img
                  src={m.iconUrl}
                  alt=""
                  className={[
                    "h-6 w-6 object-contain select-none",
                    m.reached ? "" : "opacity-70 grayscale-[20%]",
                  ].join(" ")}
                />
              </div>
            ))}
          </div>

          <div className="relative mt-1 h-6 w-full">
            {milestonesMobileUI.map((m) => (
              <div
                key={`${m.key}-label`}
                className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[12px] font-extrabold text-[#d1853f]"
                style={{ left: `${m.leftPct}%` }}
              >
                {m.points}
                {unitLabel}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 text-center text-sm text-black/70">
          我的{unitLabel}：{pointsNow}
        </div>
      </div>
    </div>
  );
}