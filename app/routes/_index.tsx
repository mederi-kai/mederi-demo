/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import invariant from "tiny-invariant";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { checkValidDoctor } from "~/mock/doctor";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const isLogined = false;
  const type: "doctor" | "admin" = "doctor";
  // ログイン済みだったらリダイレクト
  if (isLogined) {
    return redirect(`/dashboard/${type}/home`);
  } else {
    return json("");
  }
};

export default function Page() {
  const fetcher = useFetcher<typeof action>();

  const state = fetcher.state;
  const data = fetcher.data;

  const inputForms = [
    {
      placeholder: "メールアドレス",
      name: "email",
    },
    {
      placeholder: "パスワード",
      name: "password",
    },
  ];

  return (
    <div className="py-10 relative max-w-[960px] mx-auto">
      <Card className="max-w-[540px] mx-auto flex-1">
        <CardHeader className="flex flex-col items-center space-y-4 py-6">
          <img
            src="/logo/gray.png"
            alt="mederi"
            width={1600 / 8}
            height={400 / 8}
          />
          <p className="font-bold">ログイン</p>
        </CardHeader>
        <Separator />
        <CardContent className="text-center py-10 space-y-6">
          <p className="text-sm">
            メールアドレスとログインパスワードを入力してください
          </p>
          <fetcher.Form method="post" className="space-y-6">
            <div className="space-y-2 my-4">
              {inputForms.map((i) => {
                return (
                  <Input
                    key={i.name}
                    name={i.name}
                    placeholder={i.placeholder}
                    className="max-w-[360px] mx-auto text-[16px] px-4 py-6"
                  />
                );
              })}
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <Checkbox id="autocomplete" />
              <label
                htmlFor="autocomplete"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                メールアドレスを記憶する
              </label>
            </div>
            <Button variant="primary" className="w-[320px]" size={"lg"}>
              ログイン
            </Button>
            {data && <p className="text-sm">{data.toLocaleString()}</p>}
          </fetcher.Form>
        </CardContent>
      </Card>
      <div className="space-y-2 absolute right-10 bottom-10">
        <Link to="/dashboard/doctor/home" className="block">
          <Button className="bg-[#99dde2] hover:bg-[#99dde2]/80 w-[120px]">
            医師デモ
          </Button>
        </Link>
        <Link to="/dashboard/admin/home" className="block">
          <Button variant="primary" className="w-[120px]">
            管理者デモ
          </Button>
        </Link>
      </div>
    </div>
  );
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || !email) {
    return json("メールアドレスが空です");
  }
  if (typeof password !== "string" || !password) {
    return json("パスワードが空です");
  }

  const doctor = await checkValidDoctor(email, password);
  if (doctor) {
    return redirect(`/dashboard/doctor/home`);
  } else {
    return json("メールアドレスかパスワードが間違っています");
  }
};
