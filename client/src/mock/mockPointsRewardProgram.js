export const mockPointsRewardProgram = {
  event: {
    eventId: "points-reward-demo",
    title: "積分獎勵",
  },
  //  points / rewards / tasks 分開
  points: {
    unitLabel: "積分",
    maxMilestone: 150,
    milestones: [
     {
      points: 150,
      rewardId: "reward_150"
      
    },
    {
      points: 300,
      rewardId: "reward_300"
    },
    {
      points: 450,
      rewardId: "reward_450"
    }
    ],
    defaultValue: 0,
  },

  rewards: [
    {
      rewardId: "reward_150",
      milestonePoints: 150,
      title: "150積分獎勵",
      preview: {
        imageUrl: "https://roworld.gnjoy.hk/mlktwgh/png/award-150-8546a9c1.png",
        description: "神秘寶箱 x1",
      },
    },
    {
      rewardId: "reward_300",
      milestonePoints: 300,
      title: "300積分獎勵",
      preview: {
        imageUrl: "https://roworld.gnjoy.hk/mlktwgh/png/award-250-f6e1af32.png",
        description: "神秘寶箱 x2",
      },
    },
    {
      rewardId: "reward_450",
      milestonePoints: 450,
      title: "450積分獎勵",
      preview: {
        imageUrl: "https://roworld.gnjoy.hk/mlktwgh/png/award-450-4b6f89db.png",
        description: "神秘寶箱 x3",
      },
    },
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
        requiresLogin: true,
      },
    },
  ],
};
