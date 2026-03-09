function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

export function computeDesktopProgress(
  baseProgress,
  {
    topPadPct = 6,
    bottomPadPct = 12,
    barWidth = 10,
  } = {},
) {
  if (!baseProgress) {
    return null;
  }

  const { pointsNow, unitLabel, milestones, maxPoints } = baseProgress;

  const safeMaxPoints = Math.max(1, maxPoints);
  const activeProgress = clamp(pointsNow / safeMaxPoints, 0, 1);

  const trackPct = 100 - topPadPct - bottomPadPct;

  const fillStyle = {
    bottom: `${bottomPadPct}%`,
    height: `${activeProgress * trackPct}%`,
  };

  const milestonesUI = Array.isArray(milestones)
    ? milestones.map((m) => ({
        ...m,
        topPct: topPadPct + (1 - m.t01) * trackPct,
      }))
    : [];

  return {
    pointsNow,
    unitLabel,
    milestones: milestonesUI,
    milestonesUI,
    topPadPct,
    bottomPadPct,
    barWidth,
    fillStyle,
  };
}