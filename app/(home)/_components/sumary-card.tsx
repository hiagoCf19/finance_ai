import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  return (
    <Card className={`${size != "small" && "bg-muted/50 md:h-auto"}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}

        <div>
          <p
            className={`${size === "small" ? "text-sm text-muted-foreground md:text-base" : "text-sm text-white opacity-70 md:text-base"}`}
          >
            {title}
          </p>
          <p
            className={`font-bold ${size === "small" ? "md:hidden" : "md:hidden"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>
        </div>
      </CardHeader>
      <CardContent className="hidden justify-between md:flex">
        <p
          className={`font-bold ${size === "small" ? "md:text-2xl" : "md:text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
