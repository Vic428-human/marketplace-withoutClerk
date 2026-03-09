export function buildBaseProgressModel(program) {
  const pointsNow = Number(
    program?.points?.current ??270,
  );

  const unitLabel = program?.points?.unitLabel ?? "";

  const rawMilestones = Array.isArray(program?.points?.milestones)
    ? program.points.milestones
    : [];

  const rewardsByPoints = new Map(
    (program?.rewards ?? []).map((r) => [Number(r.milestonePoints), r]),
  );

  const milestones = rawMilestones
    .map((m, index) => {
      const points = Number(m.points ?? 0);

      return {
        key: m.rewardId ?? `milestone-${points}-${index}`,
        points,
        iconUrl:
          m.iconUrl ??
          "https://roworld.gnjoy.hk/mlktwgh/png/milestone-item-9b906a33.png",
        reached: pointsNow >= points,
        reward: rewardsByPoints.get(points) ?? null,
      };
    })
    .sort((a, b) => a.points - b.points);

  const pts = milestones.map((m) => m.points);
  const minPoints = pts.length ? Math.min(...pts) : 0;
  const maxPoints = pts.length ? Math.max(...pts) : 1;
  const range = Math.max(1, maxPoints - minPoints);

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const progress01 = clamp01((pointsNow - minPoints) / range);

  const milestonesWithT01 = milestones.map((m) => ({
    ...m,
    t01: clamp01((m.points - minPoints) / range),
  }));

  return {
    pointsNow,
    unitLabel,
    minPoints,
    maxPoints,
    range,
    progress01,
    milestones: milestonesWithT01,
  };
}