export const getFromLocalStorage = (item: string) => {
  return localStorage.getItem(item);
};

export const saveToLocalStorage = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

export const convertDateToUnixTimestampInMs = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
