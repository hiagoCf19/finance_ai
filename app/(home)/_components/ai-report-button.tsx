"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-reports";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import MarkDown from "react-markdown";
interface AiReportButtonProps {
  month: string;
}
const AiReportButton = ({ month }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="font-bold">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar um relatorio com insights
            sobre suas finanças
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose prose-slate max-h-[450px] text-white marker:text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <MarkDown>{report}</MarkDown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerateReportClick} disabled={isLoading}>
            {isLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Gerar relatório"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
