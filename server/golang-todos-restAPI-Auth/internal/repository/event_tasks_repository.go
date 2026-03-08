package repository

import (
	"context"
	"todo_api/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
)

func GetEventTasksByUser(ctx context.Context, pool *pgxpool.Pool, userID string, eventID string) ([]models.TaskWithStatus, error) {
	query := `
		SELECT 
			t.task_id,
			t.title,
			t.points_reward,
			COALESCE(utp.current_count, 0) AS current_count,
			COALESCE(utp.is_completed, false) AS is_completed,
			COALESCE(utp.is_claimed, false) AS is_claimed
		FROM tasks t
		LEFT JOIN user_task_progress utp 
			ON t.task_id = utp.task_id 
			AND t.event_id = utp.event_id
			AND utp.user_id = $1
		WHERE t.event_id = $2
	`

	rows, err := pool.Query(ctx, query, userID, eventID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []models.TaskWithStatus
	for rows.Next() {
		var task models.TaskWithStatus
		err := rows.Scan(
			&task.TaskID,
			&task.Title,
			&task.Points,
			&task.Status.CurrentCount,
			&task.Status.IsCompleted,
			&task.Status.IsClaimed,
		)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}

	return tasks, nil
}
