// forwardRef 是做什麼
// const CheckboxGroup = forwardRef(function CheckboxGroup(...) { ... });
// 「我要做一個元件，而且允許父元件把 ref 傳進來，
// 讓父元件可以直接控制這個元件內的某個 DOM 元素（例如 <input>）。」

function CheckboxGroup({ label, name, options, value, onChange, error }) {
  const handleChange = (optionValue, checked) => {
    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    // 打勾的部分，會逐漸累積 => ["session-a", "session-b"]
    onChange(newValue);
  };

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-gray-800">
        {label} <span className="text-red-500">*</span>
      </p>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={(e) =>
                handleChange(option.value, e.target.checked)
              }
              className="h-4 w-4"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default CheckboxGroup;
