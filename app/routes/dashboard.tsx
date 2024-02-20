import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Navbar from "~/components/layout/navbar";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ username: "山田 花子" });
};

export default function Page() {
  const { username } = useLoaderData<typeof loader>();
  return (
    <div>
      <Navbar isAdmin={false} username={username} />
      <Outlet />
    </div>
  );
}
