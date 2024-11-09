import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

export interface TransactionTypeBadgeProps {
  transaction: Transaction;
}
const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-primary/10 font-bold hover:bg-primary/20">
        <CircleIcon className="mr-2 fill-primary text-primary" size={10} />
        Despósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-destructive/30 font-bold hover:bg-destructive/30">
        <CircleIcon
          className="mr-2 fill-destructive text-destructive"
          size={10}
        />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-white/10 font-bold hover:bg-white/10">
      <CircleIcon className="mr-2 fill-white text-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
