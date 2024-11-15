"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transactionDialog";
import { ArrowDownUpIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
interface AddTransactionButtonProps {
  size?: "full" | "normal";
}
const AddTransactionButton = ({
  size = "normal",
}: AddTransactionButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        className={`rounded-xl font-bold ${size === "full" && "text-md flex h-full w-full flex-col-reverse md:hidden"}`}
        onClick={() => setIsDialogOpen(true)}
      >
        {size === "full" ? (
          <PlusIcon className="size-12" />
        ) : (
          <ArrowDownUpIcon />
        )}
        Adicionar transação
      </Button>
      <UpsertTransactionDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default AddTransactionButton;
