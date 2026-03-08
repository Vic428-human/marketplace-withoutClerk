package models

type EventMilestone struct {
	Points   int    `json:"points"`
	RewardID string `json:"rewardId"`
}

type EventPointsConfig struct {
	UnitLabel    string           `json:"unitLabel"`
	MaxMilestone int              `json:"maxMilestone"`
	DefaultValue int              `json:"defaultValue"`
	Milestones   []EventMilestone `json:"milestones"`
}
