function getTaskButtonMeta(task) {
  if (task?.status?.isClaimed) {
    return {
      text: "已領取",
      disabled: true,
    };
  }

  if (task?.status?.isCompleted) {
    return {
      text: "領取獎勵",
      disabled: false,
    };
  }

  return {
    text: "前往完成",
    disabled: false,
  };
}

function TaskItem({ task, index, onAction }) {
  const isClaimed = task?.status?.isClaimed;
  const isCompleted = task?.status?.isCompleted;

  const buttonText = isClaimed
    ? "已領取"
    : isCompleted
      ? "領取獎勵"
      : "前往完成";

  const isDisabled = isClaimed;

  return (
    <div
      className="
        flex flex-col gap-3
        rounded-[18px] border border-[#f1d9b8] bg-white/90
        p-3 shadow-sm
        sm:rounded-[20px]
        lg:flex-row lg:items-center lg:gap-4 lg:rounded-[24px]
      "
    >
      <div className="flex items-start gap-3 sm:gap-4 lg:flex-1">
        <div
          className="
            shrink-0 rounded-[12px] bg-[#f8a77c]
            px-2 py-1 text-xs font-bold text-white
            sm:rounded-[14px] sm:px-3 sm:py-2 sm:text-sm
          "
        >
          {index === 0 ? "特別任務" : `任務 ${index + 1}`}
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex flex-wrap items-center gap-1 sm:gap-2
              text-base font-bold text-[#de8d53]
              sm:text-sm lg:text-lg
            "
          >
            <span className="break-words">{task.title}</span>
            <span>+{task.points}</span>
          </div>

          <div className="mt-1 text-xs text-[#9a9a9a] sm:text-sm">
            目前進度：{task?.status?.currentCount ?? 0}
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={isDisabled}
        onClick={() => onAction?.(task)}
        className={`
          w-full shrink-0 rounded-full border-2 px-4 py-2
          text-sm font-bold text-white
          disabled:cursor-not-allowed disabled:opacity-60
          sm:px-5 sm:py-2.5 sm:text-base
          lg:w-auto lg:px-6 lg:py-3 lg:text-lg
          ${
            isCompleted
              ? "border-red-700 bg-red-500"
              : "border-[#9c7700] bg-[#f2c21b]"
          }
        `}
      >
        {buttonText}
      </button>
    </div>
  );
}
export default function TasksPanel({ tasks = [], onTaskAction }) {
  return (
    <section className="flex h-full flex-col">
      <div className="mb-4 text-center">
        <h2 className="text-[22px] font-extrabold text-[#9b6a43]">
          做任務獲取積分獎勵
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 m-4">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.taskId}
              task={task}
              index={index}
              onAction={onTaskAction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}