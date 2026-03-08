package models

type TaskStatus struct {
	IsCompleted  bool `json:"isCompleted"`
	CurrentCount int  `json:"currentCount"`
	IsClaimed    bool `json:"isClaimed"`
}

type TaskWithStatus struct {
	TaskID string     `json:"taskId"`
	Title  string     `json:"title"`
	Points int        `json:"points"`
	Status TaskStatus `json:"status"`
}
