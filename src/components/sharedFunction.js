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
  today.getMonth() - 1,
  today.getDate(),
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

const day0 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  0,
  0,
  0
);

export const formatedDay0 =
  (day0.getMonth() + 1).toString() + "/" + day0.getDate().toString();

const day1 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 1,
  0,
  0,
  0
);

export const formatedDay1 =
  (day1.getMonth() + 1).toString() + "/" + day1.getDate().toString();

const day2 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 2,
  0,
  0,
  0
);

export const formatedDay2 =
  (day2.getMonth() + 1).toString() + "/" + day2.getDate().toString();

const day3 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 3,
  0,
  0,
  0
);

export const formatedDay3 =
  (day3.getMonth() + 1).toString() + "/" + day3.getDate().toString();

const day4 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 4,
  0,
  0,
  0
);

export const formatedDay4 =
  (day4.getMonth() + 1).toString() + "/" + day4.getDate().toString();

const day5 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 5,
  0,
  0,
  0
);

export const formatedDay5 =
  (day5.getMonth() + 1).toString() + "/" + day5.getDate().toString();

const day6 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 6,
  0,
  0,
  0
);

export const formatedDay6 =
  (day6.getMonth() + 1).toString() + "/" + day6.getDate().toString();
