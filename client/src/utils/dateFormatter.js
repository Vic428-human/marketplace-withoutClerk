const formatter = new Intl.DateTimeFormat('zh-TW', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * 將時間戳（毫秒）或 Date 物件格式化為 yyyy-MM-dd 格式
 * @param ts - 時間戳（字串、數字）或 Date 物件，預設現在
 * @returns '2025-03-04' 格式的字串
 */
export function formatDate(ts){
  let date;

  if (ts instanceof Date) {
    date = ts;
  } else if (ts != null) {
    date = new Date(Number(ts));
  } else {
    date = new Date();
  }

  // 處理無效日期的情況
  if (Number.isNaN(date.getTime())) {
    return '無效日期';
  }

  return formatter.format(date);
}