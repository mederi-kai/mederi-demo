import invariant from "tiny-invariant";
import { getNewId } from "./util";

type DoctorMutation = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  tel?: string;
};

export type DoctorRecord = DoctorMutation & {
  id: string;
  createdAt: string;
};

const fakeDoctors = {
  records: {} as Record<string, DoctorRecord>,
  async get(id: string): Promise<DoctorRecord | null> {
    return fakeDoctors.records[id] || null;
  },
  async verify(
    email: string,
    password: string
  ): Promise<NonNullable<DoctorRecord> | null> {
    const doctor = Object.values(fakeDoctors.records).find(
      (doctor) => doctor.email === email && doctor.password === password
    );
    return doctor || null;
  },
  async create(values: DoctorMutation): Promise<DoctorRecord> {
    const id = values.id || getNewId("doctor");
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeDoctors.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: DoctorMutation): Promise<DoctorRecord> {
    const doctor = await fakeDoctors.get(id);
    invariant(doctor, `No doctor found for ${id}`);
    const updatedDoctor = { ...doctor, ...values };
    fakeDoctors.records[id] = updatedDoctor;
    return updatedDoctor;
  },

  destroy(id: string): null {
    delete fakeDoctors.records[id];
    return null;
  },
};

export async function checkValidDoctor(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return fakeDoctors.verify(email, password);
}

["piyo", "fuwa"].forEach((name) => {
  fakeDoctors.create({
    name,
    id: getNewId("doctor"),
    email: `${name}@mederi.jp`,
    password: "password",
  });
});
