import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./sumary-card";
import AddTransactionButton from "@/app/_components/add-transaction-button";

interface SummaryCards {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
}: SummaryCards) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* PRIMEIRO CARD */}

      <SummaryCard
        icon={<WalletIcon className="size-7 md:size-4" />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6">
        <SummaryCard
          icon={<PiggyBankIcon className="size-7 md:size-4" />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon className="size-7 text-primary md:size-4" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon className="size-7 text-red-500 md:size-4" />}
          title="Despesas"
          amount={expensesTotal}
        />
        <AddTransactionButton size="full" />
      </div>
    </div>
  );
};

export default SummaryCards;
