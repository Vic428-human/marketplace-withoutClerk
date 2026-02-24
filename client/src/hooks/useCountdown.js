import { useState, useEffect, useCallback, useRef } from 'react';

export function useCountdown(duration = 3, onClose) {
  // 1. 管理倒數時間狀態與計時旗標
  const [remindTime, setRemindTime] = useState(duration);
  const [isCountingDown, setIsCountingDown] = useState(false);

  // 2. 用 useRef 儲存 timer ID 解決 setInterval 內無法存取最新 timer 的問題
  const timerRef = useRef();

  // 3. 避免每次父組件 render 都重建 startCountdown 函數
  const startCountdown = useCallback(() => {
    // 防止多個 timer 同時運行
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // 重置狀態
    setIsCountingDown(true);
    setRemindTime(duration);

    // 建立新的 interval，每秒減 1
    timerRef.current = setInterval(() => {
      setRemindTime((v) => {
        if (v <= 1) {
          // 倒數結束：清理 + 關閉廣告 + 重置
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setIsCountingDown(false);
          setRemindTime(0);
          if (onClose) onClose(); // 通知父組件關閉廣告
          return 0;
        }
        return v - 1; // 正常倒數
      });
    }, 1000);
  }, [duration, onClose]); // 只在這兩個依賴改變時重建

  // 4. 組件卸載時自動清理（防止記憶體洩漏）
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { remindTime, isCountingDown, startCountdown };
}