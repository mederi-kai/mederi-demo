export const getNewId = (type: "patient" | "doctor" | "reservation") => {
  return `${type}-${Math.random().toString(36).substring(2, 9)}`;
};
