export const judgeDayOfWeek = (date: Date) => {
  // Date.getDay()は0~6の数値を返す
  const dayOfWeek = date.getDay();
  switch (dayOfWeek) {
    case 0:
      return "日";
    case 1:
      return "月";
    case 2:
      return "火";
    case 3:
      return "水";
    case 4:
      return "木";
    case 5:
      return "金";
    case 6:
      return "土";
  }
};

// 20210102のような日付が有効かどうかを判定する
export const isValidDateNumber = (dateNumber: string) => {
  // 8桁でない場合はfalseを返す
  if (dateNumber.length !== 8) {
    return false;
  }
  // 数値でない場合はfalseを返す
  if (isNaN(Number(dateNumber))) {
    return false;
  }
  // 月が1~12の範囲外の場合はfalseを返す
  const month = Number(dateNumber.slice(4, 6));
  if (month < 1 || month > 12) {
    return false;
  }
  // 日が1~31の範囲外の場合はfalseを返す
  const day = Number(dateNumber.slice(6, 8));
  if (day < 1 || day > 31) {
    return false;
  }
  // 日付として有効な場合はtrueを返す
  return true;
};

// 20210102のような形式で返す
export const formattedDateNumber = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 月が1桁の場合は0をつける
  const monthString = month < 10 ? `0${month}` : `${month}`;
  // 日が1桁の場合は0をつける
  const dayString = day < 10 ? `0${day}` : `${day}`;
  return `${year}${monthString}${dayString}`;
};

// 2021年1月2日（土）のような形式で返す
export const formattedDate = (date: Date | string) => {
  if (typeof date === "string") {
    // 20210102のような形式をDate型に変換
    const year = Number(date.slice(0, 4));
    const month = Number(date.slice(4, 6));
    const day = Number(date.slice(6, 8));
    date = new Date(year, month - 1, day);
  }

  const week = judgeDayOfWeek(date);
  // Date型
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日（${week}）`;
};
