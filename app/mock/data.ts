import { ReservationMutation } from "./reservation";

export const patient1 = {
  id: "patient1",
  email: `sample@mederi.jp`,
  password: "password",
  name: "山村 香織",
  furigana: "ヤマムラ カオリ",
  age: 21,
  tel: "080-2100-0341",
  prefecture: "東京",
  shareThings: [
    {
      tag: "CS",
      date: "2022/05/26",
      description: "お客様が料金に関して質問があるとのこと",
    },
    {
      tag: "医師",
      date: "2022/05/26",
      description: "配送保留 ユーザーが検討中",
    },
    {
      tag: "CS",
      date: "2022/05/26",
      description: "お客様が料金に関して質問があるとのこと",
    },
    {
      tag: "管理",
      date: "2022/05/26",
      description: "お客様が料金に関して質問があるとのこと",
    },
  ],
};

export const patient2 = {
  id: "patient2",
  email: `example@mederi.jp`,
  password: "password123",
  name: "佐藤 美咲",
  furigana: "サトウ ミサキ",
  age: 28,
  tel: "090-3341-5567",
  prefecture: "大阪",
  shareThings: [
    {
      tag: "CS",
      date: "2023/01/15",
      description: "お客様が配送に関して質問があるとのこと",
    },
    {
      tag: "医師",
      date: "2023/01/15",
      description: "症状の改善を確認",
    },
    {
      tag: "CS",
      date: "2023/01/15",
      description: "再診の予約に関する質問",
    },
    {
      tag: "管理",
      date: "2023/01/15",
      description: "保険適用の確認が必要",
    },
  ],
};

const interviewContents = [
  {
    question: "服用経験",
    answer: "過去に飲んでいた",
  },
  {
    question: "服用経験ピル",
    answer: "マーベロン",
  },
  {
    question: "改善したい項目",
    answer: "",
  },
  {
    question: "希望ピル",
    answer: "マーベロン",
  },
  {
    question: "年齢",
    answer: "21歳",
  },
  {
    question: "月経周期",
    answer: "28日",
  },
  {
    question: "最終月経日",
    answer: "2022/05/23",
  },
  {
    question: "妊娠・出産",
    answer: "経験あり（妊娠2回/出産1回）",
  },
  {
    question: "BMI",
    answer: "25(162cm/52kg)",
  },
  {
    question: "妊娠中に「黄疸」「ヘルペス」「持続性掻痒症」と診断",
    answer: "診断されたことがある",
  },
  {
    question: "服用中の薬",
    answer: "なし",
  },
  {
    question: "アレルギー",
    answer: "金属",
  },
  {
    question: "たばこ",
    answer: "1日に2~3本",
  },
  {
    question: "不正出血",
    answer: "なし",
  },
  {
    question: "婦人科系疾患",
    answer: "子宮頸がん",
  },
  {
    question: "血栓症",
    answer: "なし",
  },
  {
    question: "乳がん",
    answer: "家族にかかった人はいない",
  },
  {
    question: "聞きたいこと",
    answer: "",
  },
  {
    question: "身分証確認",
    answer: "",
  },
];

export const reservation1: ReservationMutation = {
  prescription: {
    medecines: [
      {
        tag: "抗生物質",
        color: "blue",
        note: "2週間分",
      },
      {
        tag: "解熱剤",
        color: "yellow",
        note: "必要に応じて",
      },
    ],
    completedAt: "2022/05/26",
    deliveryStatus: "DELIVERED",
  },
  interview: { contents: interviewContents, createdAt: "2022/05/26" },
};

export const reservation2: ReservationMutation = {
  prescription: {
    medecines: [
      {
        tag: "ピル",
        color: "pink",
        note: "まとめ3一括",
      },
      {
        tag: "漢方",
        color: "brown",
        note: "まとめ3一括",
      },
    ],
    completedAt: "2022/05/26",
    deliveryStatus: "DELIVERED",
  },
  interview: { contents: interviewContents, createdAt: "2022/05/26" },
};
