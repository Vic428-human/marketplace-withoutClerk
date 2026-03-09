// utils/progressModel.js（你也可以先放同檔案最上方）
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

export function buildProgressModel({
  program,
  milestonesDesc,
  topPadPct = 6,
  bottomPadPct = 12,
  fallbackPointsNow = 0,
  barWidth = 10,
}) {
  // 計算當前分數
  const pointsNow = Number(program?.points?.current ?? fallbackPointsNow);
  // 有哪些積分門檻?
  const thresholds = (milestonesDesc ?? []).map((m) => Number(m.points));
  const maxThreshold = Math.max(1, ...thresholds);
  // 積分可能超過門檻最大值，可以把數值限縮在一定範圍內
  const activeProgress = clamp(pointsNow / maxThreshold, 0, 1);
  // 進度條可用長度
  const trackPct = 100 - topPadPct - bottomPadPct;
  // 從哪裡開始填滿
  const fillStyle = {
    bottom: `${bottomPadPct}%`,
    height: `${activeProgress * trackPct}%`,
  };

  function getMilestoneTopPct(points) {
    const t01 = 1 - Number(points) / maxThreshold; // 0=最上, 1=最下
    return topPadPct + t01 * trackPct;
  }

  const milestonesUI = (milestonesDesc ?? []).map((m) => ({
    key: m.rewardId,
    points: m.points,
    iconUrl:
      m.iconUrl ??
      "https://roworld.gnjoy.hk/mlktwgh/png/milestone-item-9b906a33.png",
    reached: pointsNow >= Number(m.points),
    topPct: getMilestoneTopPct(m.points),
  }));

  return {
    pointsNow,
    maxThreshold,
    topPadPct,
    bottomPadPct,
    barWidth,
    fillStyle,
    milestonesUI,
    fallbackPointsNow,
  };
}
