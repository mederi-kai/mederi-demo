import { Button } from "./ui/button";
import { Tag } from "~/components/ui/tag";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from "lucide-react";
import { ReservationRecord } from "~/mock/reservation";
import { useState } from "react";
import { PatientRecord } from "~/mock/patient";

interface Props {
  interviews: NonNullable<ReservationRecord["interview"]>[];
  shareThings: NonNullable<PatientRecord["shareThings"]>;
}

export const MedicalInterview: React.FC<Props> = ({
  shareThings,
  interviews,
}) => {
  const answerElement = ({
    question,
    answer,
  }: {
    question: string;
    answer: string;
  }) => {
    switch (question) {
      case "改善したい項目":
        return (
          <div className="space-x-2">
            <Tag color="blue" className="rounded-sm">
              PMS
            </Tag>
            <Tag color="purple" className="rounded-sm">
              月経不順
            </Tag>
          </div>
        );
      case "妊娠中に「黄疸」「ヘルペス」「持続性掻痒症」と診断":
        return (
          <span className="text-primary font-bold">診断されたことがある</span>
        );
      default:
        return <span>{answer}</span>;
    }
  };

  const [tabIndex, setTabIndex] = useState<number>(0);

  const currentContents = interviews[tabIndex].contents;

  const tabs = [
    {
      name: "事前問診",
      value: "0",
      contents: interviews[0].contents,
    },
    {
      name: `再診問診（${interviews.length - 1}）`,
      value: "1",
      contents: currentContents,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="0">
        <TabsList className="flex justify-stretch items-start">
          {tabs.map((tab) => {
            return (
              <TabsTrigger
                value={tab.value}
                key={tab.name}
                className="data-[state=active]:bg-white data-[state=active]:border-border data-[state=active]:text-primary"
              >
                {tab.name}
              </TabsTrigger>
            );
          })}
          <Button variant="outline" className="py-0 px-2 h-8 mr-auto">
            問診・処方歴一覧
          </Button>
          <div className="space-x-1 flex flex-1 justify-end">
            <Button variant="secondary" size="icon">
              <CategoryAgency />
            </Button>
            <Button variant="default" size="icon">
              <PencilIcon />
            </Button>
          </div>
        </TabsList>
        {tabs.map((tab) => {
          return (
            <TabsContent
              value={tab.value}
              key={tab.value}
              className="rounded-br-none rounded-bl-none"
            >
              <ScrollArea className="h-[240px]">
                {tab.contents.map((content, index) => {
                  const isLast = index === tab.contents.length - 1;
                  return (
                    <div key={content.question}>
                      <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex-1">
                          <span className="h-5 text-sm text-primary w-20">
                            {content.question}
                          </span>
                        </div>
                        <div className="ml-4 text-sm">
                          {answerElement(content)}
                        </div>
                      </div>
                      {!isLast && <Separator className="border-secondary" />}
                    </div>
                  );
                })}
              </ScrollArea>
            </TabsContent>
          );
        })}
      </Tabs>
      <div className="flex justify-between items-center px-4 py-1 border border-t-0 rounded-b-md">
        <Button
          className="rounded-full shadow-none p-0 h-4.5 border-none"
          size="sm"
          onClick={() => setTabIndex(tabIndex - 1)}
          disabled={tabIndex === 0}
        >
          <ChevronLeftIcon className="text-primary" />
        </Button>
        <p className="text-sm text-secondary">最新({})</p>
        <div className="flex space-x-4">
          <Button
            className="rounded-full shadow-none p-0 h-4.5 border-none"
            variant={"outline"}
            size="sm"
            onClick={() => setTabIndex(tabIndex + 1)}
            disabled={!(tabIndex < interviews.length)}
          >
            <ChevronRightIcon className="text-primary" />
          </Button>
          <Button variant="secondary" size={"sm"} className="h-6">
            保存
          </Button>
        </div>
      </div>
      <div className="flex items-start my-4 space-x-2">
        <ScrollArea className="bg-white h-[120px] border-button-primary border-2 rounded-md flex-1">
          <div className="p-4 pb-0">
            <h5 className="font-semibold">CSとの共有事項</h5>
            {shareThings.map((t, index) => {
              const isLast = index === shareThings.length - 1;
              return (
                <div key={t.tag}>
                  <div className="flex py-4 space-x-2">
                    <Tag
                      color={
                        t.tag === "医師"
                          ? "blue"
                          : t.tag === "管理"
                          ? "pink"
                          : "gray"
                      }
                    >
                      {t.tag}
                    </Tag>
                    <p className="text-secondary text-sm">{t.date}</p>
                    <p className="text-primary text-sm">{t.description}</p>
                  </div>
                  {!isLast && <Separator />}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <Button variant={"outline"} size={"icon"}>
          <PencilIcon />
        </Button>
      </div>
    </div>
  );
};

const CategoryAgency = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M690-480h60v-68l59 34 30-52-59-34 59-34-30-52-59 34v-68h-60v68l-59-34-30 52 59 34-59 34 30 52 59-34v68ZM80-120q-33 0-56.5-23.5T0-200v-560q0-33 23.5-56.5T80-840h800q33 0 56.5 23.5T960-760v560q0 33-23.5 56.5T880-120H80Zm280-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM84-200h552q-42-75-116-117.5T360-360q-86 0-160 42.5T84-200Z" />
    </svg>
  );
};
