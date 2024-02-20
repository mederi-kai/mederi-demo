import { Tag, tagVariants } from "~/components/ui/tag";
import { Button } from "./ui/button";
import { ClockIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  timelines: {
    id: string;
    disabled: boolean;
  }[];
};

export const Timeline: React.FC<Props> = (props) => {
  const { timelines } = props;
  return (
    <ScrollArea className="h-[calc(100svh - 80px)]">
      <div className="p-4 space-y-4">
        {timelines.map((t) => {
          return <TimelineList disabled={t.disabled} key={t.id} />;
        })}
      </div>
    </ScrollArea>
  );
};

const TimelineList: React.FC<{
  disabled: boolean;
}> = (props) => {
  const { disabled } = props;
  const time = "07:30";
  const tool = "Face Time";
  const name = "山村 香織";
  const furigana = "ヤマムラ カオリ";
  const badges = [
    { label: "ピル", color: "beige" },
    { label: "初診", color: "pink" },
  ];
  const bgClass = disabled ? "bg-border" : "bg-white";
  return (
    <div className={`${bgClass} rounded shadow`}>
      <div className="flex justify-between">
        <Button
          size="icon"
          className="bg-facetime rounded-t-none rounded-l-none mb-auto"
        >
          <ClockIcon className="w-4 h-4" />
        </Button>
        <div className="flex-1 space-x-2">
          <div className="px-2 py-1 space-x-4 flex items-center">
            <div className="space-x-1">
              <span className="text-neutral-500 text-[12px]">{time}</span>
              <span className="text-neutral-500 text-[12px]">{tool}</span>
            </div>
            <div className="space-x-1">
              {badges.map((b) => {
                return (
                  <Tag
                    key={b.label}
                    color={b.color as keyof typeof tagVariants}
                    className="rounded-full py-0"
                  >
                    {b.label}
                  </Tag>
                );
              })}
            </div>
          </div>
          <div className="flex items-center py-2 space-x-4">
            <h4 className="text-xl">{name}</h4>
            <span className="text-neutral-500 text-[12px]">{furigana}</span>
          </div>
        </div>
        <Button
          size="icon"
          className="rounded-b-none rounded-r-none mt-auto"
          variant={"secondary"}
          disabled={disabled}
        >
          <ClockIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
