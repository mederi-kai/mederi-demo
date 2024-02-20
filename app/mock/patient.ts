import invariant from "tiny-invariant";
import { getNewId } from "./util";
import { createReservation } from "./reservation";
import { patient1, patient2, reservation1, reservation2 } from "./data";

type PatientMutation = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  tel?: string;
  furigana?: string;
  age?: number;
  prefecture?: string;
  identification?: {}; // 確認書類
  shareThings: {
    tag: string;
    date: string;
    description: string;
  }[];
};

export type PatientRecord = PatientMutation & {
  id: string;
  createdAt: string;
};

const fakePatients = {
  records: {} as Record<string, PatientRecord>,
  async get(id: string): Promise<PatientRecord | null> {
    return fakePatients.records[id] || null;
  },
  async verify(
    email: string,
    password: string
  ): Promise<NonNullable<PatientRecord> | null> {
    const patient = Object.values(fakePatients.records).find(
      (patient) => patient.email === email && patient.password === password
    );
    return patient || null;
  },
  async create(values: PatientMutation): Promise<PatientRecord> {
    const id = values.id || getNewId("patient");
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakePatients.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: PatientMutation): Promise<PatientRecord> {
    const patient = await fakePatients.get(id);
    invariant(patient, `No patient found for ${id}`);
    const updatedPatients = { ...patient, ...values };
    fakePatients.records[id] = updatedPatients;
    return updatedPatients;
  },

  destroy(id: string): null {
    delete fakePatients.records[id];
    return null;
  },
};

export async function checkValidPatients(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return fakePatients.verify(email, password);
}

export const getAllPatinets = () => {
  return Object.values(fakePatients.records);
};

export const getPatient = (
  id: string
): Promise<NonNullable<PatientRecord> | null> => {
  return fakePatients.get(id);
};

[patient1, patient2].forEach((patient) => {
  (async () => {
    const { id } = await fakePatients.create(patient);
    await createReservation({ patientId: id, ...reservation1 });
    await createReservation({ patientId: id, ...reservation2 });
  })();
});
