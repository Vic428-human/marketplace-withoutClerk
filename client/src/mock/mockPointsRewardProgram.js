export const mockPointsRewardProgram = {
  event: {
    eventId: "points-reward-demo",
    title: "積分獎勵",
  },

  points: {
    unitLabel: "積分",
    maxMilestone: 150,
    milestones: [
      {
        points: 150,
        rewardId: "reward_150"
      }
    ],
    defaultValue: 0
  },

  rewards: [
    {
      rewardId: "reward_150",
      milestonePoints: 150,
      title: "150積分獎勵",
      preview: {
        imageUrl: "https://via.placeholder.com/120",
        description: "神秘寶箱 x1"
      }
    }
  ],

  tasks: [
    {
      taskId: "task_bind_phone",
      badgeText: "特別任務",
      title: "綁定手機門號",
      points: 200,
      limitText: "活動參與限制 1 次",
      action: {
        label: "前往完成",
        url: "/account/bind-phone",
        requiresLogin: true
      }
    }
  ]
};