import { Button } from "~/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
  SelectGroup,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useFetcher } from "@remix-run/react";

export default function PrescriptionForm() {
  const selectItems = [{ value: "marvelon", label: "低用量ピル" }];

  const selections = ["低用量ピル", "マーベロン"];
  const tags = ["マーベロン(初月無料)", "〇〇(吐き気どめ)"];

  const fetcher = useFetcher();
  const state = fetcher.state;
  const isLoading = state === "loading";

  return (
    <fetcher.Form action="save" method="post">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0">
          <CardTitle>処方内容</CardTitle>
          <div className="space-x-2 flex items-center">
            <Button
              variant={"outline"}
              className="text-[10px] h-6 font-normal border-[1px] text-primary"
            >
              不在
            </Button>
            <Button
              variant={"outline"}
              className="text-[10px] h-6 font-normal border-[1px] text-primary"
            >
              処方不可
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="py-2">
          <Textarea
            className="min-h-[120px] placeholder:text-[14px]"
            placeholder={[
              "カルテ自由記入欄（必須）",
              "・ユーザーからの質問事項",
              "・医師から案内した内容など",
            ].join("\n")}
          />
        </CardContent>
        <Separator />
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex flex-1 items-center my-2 space-x-1">
              {selections.map((s, index) => {
                return (
                  <Select key={s}>
                    <SelectTrigger
                      className={`${
                        index === 0 ? "max-w-[120px]" : ""
                      } text-[14px] p-2 h-8`}
                    >
                      <SelectValue placeholder={s} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectItems.map((i) => {
                          return (
                            <SelectItem value={i.value} key={i.value}>
                              {i.label}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-2 flex items-start">
              <div className="space-y-1">
                {tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="border-[1px] break-normal px-2 py-[2px] rounded-sm text-[10px] border-[1px] flex items-center justify-between"
                    >
                      <p>{tag}</p>
                      <button className="flex items-center justify-center rounded-full w-2 h-2 text-[12px] text-tertiary border-tertiary">
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              variant="primary"
              className="col-span-1 w-120 h-20"
              type="submit"
            >
              {isLoading ? "ローディング" : "処方確定"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </fetcher.Form>
  );
}
