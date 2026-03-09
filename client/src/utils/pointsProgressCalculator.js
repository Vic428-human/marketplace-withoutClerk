// utils/pointsProgressCalculator.js

/**
 * 計算手機版進度條所需的資料
 * @param {Object|null} baseProgress - 共用 progress model
 * @returns {Object|null}
 */
function computeMobileProgress(baseProgress) {
  if (!baseProgress) {
    return null;
  }

  const {
    pointsNow,
    unitLabel,
    progress01,
    milestones,
  } = baseProgress;

  const leftPadPct = 6;
  const rightPadPct = 6;
  const usablePct = 100 - leftPadPct - rightPadPct;

  const fillPct = progress01 * usablePct;

  const milestonesMobileUI = Array.isArray(milestones)
    ? milestones.map((m) => ({
        ...m,
        leftPct: leftPadPct + m.t01 * usablePct,
        rewardTitle: m.reward?.title ?? "",
        rewardImageUrl: m.reward?.preview?.imageUrl ?? "",
      }))
    : [];

  return {
    pointsNow,
    unitLabel,
    leftPadPct,
    rightPadPct,
    fillPct,
    milestonesMobileUI,
  };
}

export { computeMobileProgress };