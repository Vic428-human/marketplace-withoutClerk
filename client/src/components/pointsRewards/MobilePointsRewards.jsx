// components/pointsRewards/MobilePointsRewards.jsx
export default function MobilePointsRewards({
  className = "",
  program,
  mobile,
}) {
  const { pointsNow, leftPadPct, rightPadPct, fillPct, milestonesMobileUI } =
    mobile;

  return (
    <div className={`${className}`}>
      <div className="px-2 pt-2">
        {/* rewards row */}
        <div className="flex items-start justify-center gap-3">
          {milestonesMobileUI.map((m) => {
            const reward = program.rewards.find(
              (r) => r.milestonePoints === m.points,
            );
            if (!reward) return null;

            return (
              <div key={reward.rewardId} className="flex flex-col items-center">
                <button
                  type="button"
                  className="w-[86px] rounded-xl bg-white/90 border border-black/10 px-2 py-2"
                >
                  <img
                    src={reward.preview?.imageUrl}
                    alt=""
                    className="mx-auto h-10 w-10 rounded-lg object-cover bg-black/5"
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
                    {program?.points?.unitLabel}
                  </div>
                </div>
              </div>
            );
          })}
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
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${m.leftPct}%` }}
              >
                <img
                  src={m.iconUrl}
                  alt=""
                  className={[
                    "w-6 h-6 object-contain select-none",
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
                className="absolute top-0 -translate-x-1/2 text-[12px] font-extrabold text-[#d1853f] whitespace-nowrap"
                style={{ left: `${m.leftPct}%` }}
              >
                {m.points}
                {program?.points?.unitLabel}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 text-center text-sm text-black/70">
          我的{program?.points?.unitLabel}：{pointsNow}
        </div>
      </div>
    </div>
  );
}
