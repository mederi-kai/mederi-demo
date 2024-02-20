import { getNewId } from "./util";

export type ReservationMutation = {
  patientId: string; // 患者ID
  status?:
    | "" // 診察前
    | "PENDING"
    | "NG" // 処方NG
    | "ABSENT" // 不在
    | "DONE" // 処方完了完了
    | "CANCELED"; // キャンセル
  medicalCategories?: ("ピル" | "初診")[]; // 診療内容
  contactMethod?: "FaceTime" | "Zoom" | "Tel"; // 連絡手段
  prescription?: {
    medecines: Medicine[];
    completedAt: string;
    deliveryStatus: "DELIVERED" | "WAITING" | "CANCELED";
  };
  interview?: {
    contents: { question: string; answer: string }[];
    createdAt: string;
  };
  createdAt?: string; // 予約が作成された日時
  scheduledAt?: string; // 予約日時
};

export type Medicine = {
  tag: string;
  color: string;
  note: string;
};

export type ReservationRecord = ReservationMutation & {
  id: string;
  patientId: string;
  createdAt: string;
};

export const timelines = [
  { id: "aaa", disabled: false, reservedAt: "2021-01-01" },
  { id: "bbb", disabled: false, reservedAt: "2021-01-01" },
];

const fakeReservations = {
  records: {} as Record<string, ReservationRecord>,
  async create(values: ReservationMutation & { patientId: string }) {
    const id = getNewId("reservation");
    const createdAt = new Date().toISOString();
    const newReservation = { id, createdAt, ...values };
    fakeReservations.records[id] = newReservation;
  },
  async filter({
    patientId,
    day,
  }: {
    patientId?: string;
    day?: string; // 20210102のような形式
  }): Promise<ReservationRecord[]> {
    let reservation = Object.values(fakeReservations.records);
    if (patientId) {
      reservation = reservation.filter((r) => {
        return r.patientId === patientId;
      });
    }
    if (day) {
      const date = new Date(day);
      reservation = reservation.filter((r) => {
        // return r.createdAt === patientId;
      });
    }
    return reservation;
  },
};

export const getPatientReservations = async (patientId: string) => {
  return fakeReservations.filter(patientId);
};

export const createReservation = async (
  values: ReservationMutation & { patientId: string }
) => {
  await fakeReservations.create(values);
};
