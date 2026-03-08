// GET /events/points-reward-demo
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
        rewardId: "reward_150",
      },
      {
        points: 300,
        rewardId: "reward_300",
      },
      {
        points: 450,
        rewardId: "reward_450",
      },
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
      "taskId": "task_bind_phone",
      "title": "綁定手機門號",
      "points": 200,
      "status": {
        "isCompleted": false,      // 用戶進度（如「小明完成了沒」）是每個人獨立的
        "currentCount": 0,         // 當前完成次數
        "canClaim": true           // 是否可領取/完成
      }
    }
  ],
};

// POST /events/points-reward-demo/tasks/{taskId}/complete
// Authorization: Bearer {token}
