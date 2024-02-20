import { Link, useLoaderData } from "@remix-run/react";
import { Separator } from "~/components/ui/separator";
import { Timeline } from "~/components/timeline";
import { MedicalInterview } from "~/components/medical-interview";
import { TelIcon } from "~/components/icon";
import { Tag } from "~/components/ui/tag";
import { ChevronLeftIcon } from "lucide-react";

import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { formattedDate } from "~/lib/date";
import PrescriptionHistories from "~/components/prescription-history";
import PrescriptionForm from "~/components/prescription-form";
import invariant from "tiny-invariant";
import { getPatient } from "~/mock/patient";
import { getPatientReservations, timelines } from "~/mock/reservation";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // 本日の診療予約(左表示部分)
  const today = new Date();

  const patientId = params.id;
  invariant(patientId, "Missing patientId param");
  const patient = await getPatient(patientId);
  if (!patient) {
    throw new Response("Not Found", { status: 404 });
  }
  const reservationHistories = await getPatientReservations(patientId);

  return json({
    isAdmin: false,
    day: formattedDate(today),
    timelines,
    patient,
    interviews: reservationHistories.map((r) => {
      return r.interview;
    }),
    prescriptions: reservationHistories.map((r) => {
      return r.prescription;
    }),
  });
};

export default function Page() {
  const { patient, timelines, isAdmin, prescriptions, interviews } =
    useLoaderData<typeof loader>();

  const today = new Date();
  const day = formattedDate(today);

  const latestPrescriptions = prescriptions[0];

  return (
    <div>
      <div className="grid grid-cols-12 border-t border-b bg-white">
        <div className="col-span-3">
          <div className="px-4">
            <Link
              to={`/dashboard/${isAdmin ? "admin" : "doctor"}/home`}
              className="h-8 flex items-center"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="text-neutral-500 text-xs">診療一覧へ戻る</span>
            </Link>
            <h4 className="text-2xl h-10 px-1 text-neutral-600 font-bold">
              {day}
            </h4>
          </div>
        </div>

        <div className="col-span-9 grid grid-cols-9">
          <div className="col-span-2 flex">
            <Separator orientation="vertical" />
            <div className="px-4">
              <span className="h-12 text-neutral-500 text-xs  text-neutral-600 py-1">
                {patient.furigana}（{patient.age} 歳）
              </span>
              <h4 className="flex text-2xl h-12 items-center  text-neutral-600 font-bold">
                {patient.name}
              </h4>
            </div>
          </div>
          <div className="col-span-1 flex">
            <Separator orientation="vertical" />
            <div className="flex items-center justify-center px-2 text-neutral-600">
              診療回数
            </div>
          </div>
          <div className="col-span-2 flex">
            <Separator orientation="vertical" />
            <div className="flex items-center justify-center flex-1 bg-[#f8f4eb]">
              <div className="px-2 space-y-2">
                {latestPrescriptions.medecines.map((p) => {
                  return (
                    <div className="flex items-center space-x-2" key={p.tag}>
                      <Tag color={p.color}>{p.tag}</Tag>
                      <span className="text-sm text-primary text-xs">
                        {p.note}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-1 flex">
            <Separator orientation="vertical" />
            <div className="flex items-center justify-center px-2 bg-secondary flex-1">
              <span className="font-bold px-2 ">{patient.prefecture}</span>
            </div>
          </div>
          <div className="col-span-3 flex">
            <Separator orientation="vertical" />
            <div className="flex items-center justify-center px-2  text-neutral-600 font-bold space-x-2">
              <TelIcon />
              <h4 className="text-xl">{patient.tel}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-3 bg-secondary">
          <Timeline timelines={timelines} />
        </div>
        <div className="col-span-9 grid grid-cols-9">
          <div className="col-span-6 flex">
            <Separator orientation="vertical" />
            <div className="flex-1 p-4">
              <MedicalInterview
                shareThings={patient.shareThings}
                interviews={interviews}
              />
            </div>
          </div>
          <div className="col-span-3 py-4 pr-4">
            <div className="space-y-4">
              <PrescriptionHistories />
              <PrescriptionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const action = async ({ params }: ActionFunctionArgs) => {
  //invariant(params.contactId, "Missing contactId param");
  return json({ message: "ok" });
};
