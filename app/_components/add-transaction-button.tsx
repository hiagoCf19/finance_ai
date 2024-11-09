"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transactionDialog";
import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";

const AddTransactionButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-xl font-bold"
        onClick={() => setIsDialogOpen(true)}
      >
        <ArrowDownUpIcon />
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
