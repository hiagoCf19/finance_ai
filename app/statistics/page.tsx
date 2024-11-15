import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard";
import TransactionsPieChart from "../(home)/_components/transactions-pie-chart";
import ExpensesPerCategory from "../(home)/_components/expenses-per-category";
import NavBAr from "../_components/navbar";
interface HomeProps {
  searchParams: {
    month: string;
  };
}
const Statistics = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  return (
    <>
      <NavBAr />
      <h1 className="p-4 pb-0 text-2xl font-bold">DashBoard</h1>
      <div className="flex flex-col gap-4 p-4">
        <TransactionsPieChart {...dashboard} />
        <ExpensesPerCategory
          expensesPerCategory={dashboard.totalExpensePerCategory}
        />
      </div>
    </>
  );
};

export default Statistics;
