import { ReactNode } from "react";

interface PercentegeItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}
const PercentegeItem = ({ icon, title, value }: PercentegeItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* icons */}
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-muted/40 p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value} %</p>
    </div>
  );
};

export default PercentegeItem;
