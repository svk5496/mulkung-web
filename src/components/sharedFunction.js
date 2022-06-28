const today = new Date();

export const myStartDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  0,
  0,
  0
);
export const myEndDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  23,
  59,
  59
);

export const beforeWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
  0,
  0,
  0
);

export const beforeMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
  0,
  0,
  0
);

export const beforeQuarter = new Date(
  today.getFullYear(),
  today.getMonth() - 3,
  today.getDate(),
  0,
  0,
  0
);

export const beforeHalf = new Date(
  today.getFullYear(),
  today.getMonth() - 6,
  today.getDate(),
  0,
  0,
  0
);

export const beforeYear = new Date(
  today.getFullYear() - 1,
  today.getMonth(),
  today.getDate(),
  0,
  0,
  0
);

export const beforeEntire = new Date(
  today.getFullYear() - 100,
  today.getMonth(),
  today.getDate(),
  0,
  0,
  0
);
