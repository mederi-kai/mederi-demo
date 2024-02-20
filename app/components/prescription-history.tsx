import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
import { PrescriptionList } from "~/components/prescription-list";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function PrescriptionHistories() {
  const prescription = {
    date: "2022/04/20",
    name: "マーベロン",
    note: "副作用が激しいので要観察。副作用が激しいので要観察。副作用が激しいので要観察。",
    src: "/pills/marvelon.jpg",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>処方履歴</CardTitle>
      </CardHeader>
      <Separator />
      <ScrollArea className="h-36">
        <CardContent>
          {[prescription, prescription].map((p, index) => {
            return (
              <div key={index} className="p-2">
                <PrescriptionList prescription={p} />
                <Separator />
              </div>
            );
          })}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
