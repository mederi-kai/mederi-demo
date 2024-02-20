import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  formattedDate,
  formattedDateNumber,
  isValidDateNumber,
} from "~/lib/date";
import { getAllPatinets } from "~/mock/patient";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let date = url.searchParams.get("date");

  if (!date || !isValidDateNumber(date)) {
    // date パラメータがないまたは有効な日付でない場合は今日の日付を入れる
    const today = new Date();
    date = formattedDateNumber(today);
  }
  const patients = getAllPatinets();

  return json({ date, patients });
};

export default function Page() {
  const { patients, date } = useLoaderData<typeof loader>();
  const formatDate = formattedDate(date);

  return (
    <div>
      <div className="bg-white flex p-4">
        <div className="flex items-center space-x-2">
          <Button size={"icon"} className="rounded-full w-6 h-6">
            <ChevronLeft />
          </Button>
          <h4 className="text-2xl">{formatDate}</h4>
          <Button size={"icon"} className="rounded-full w-6 h-6">
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="p-4">
        {patients.map((p) => {
          return (
            <Link key={p.name} to={`${p.id}`}>
              <Card>
                <CardContent>{p.name}</CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
