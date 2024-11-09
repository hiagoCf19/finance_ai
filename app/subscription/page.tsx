import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBAr from "../_components/navbar";

const Subscription = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/login");
  return <NavBAr />;
};

export default Subscription;
