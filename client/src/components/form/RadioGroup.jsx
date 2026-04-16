import React from "react";

const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required = false,
  variant = "default",
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* 標題 */}
      {label && (
        <p className="block text-sm font-medium text-gray-800">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </p>
      )}

      {/* Radio 選項區域 */}
      <div
        className={variant === "circle" ? "space-y-4" : "flex flex-wrap gap-6"}
      >
        {options.map((option) => {
          const isChecked = value === option.value;

          // 自訂圓形樣式（用在飲食習慣）
          if (variant === "circle") {
            return (
              <label
                key={option.value}
                className="flex items-center gap-3 text-[18px] font-semibold text-[#4a4a4a] cursor-pointer"
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={onChange}
                  className="sr-only"
                />
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                    isChecked ? "border-[#b0005b]" : "border-[#d6d6d6]"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full transition-all ${
                      isChecked ? "bg-[#b0005b]" : "bg-transparent"
                    }`}
                  />
                </span>
                <span>{option.label}</span>
              </label>
            );
          }

          // 預設樣式（簡單 radio，用在是否參與晚宴等）
          return (
            <label
              key={option.value}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={onChange}
                className="h-4 w-4 accent-pink-600"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>

      {/* 錯誤訊息 */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RadioGroup;
