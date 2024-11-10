"use server";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportsSchema } from "./schema";
const DUMMY_REPORT =
  "### Relatório de finanças pessoais\n\n#### Resumo geral: O relatório financeiro de novembro de 2024 apresenta um fluxo de receita constante, mas com algumas áreas que podem ser otimizadas para alcançar maior economia e investimento no futuro.\n\n#### Recebimentos:\n1. **R$500,00** de salário no dia 1º: Certifique-se de manter esse fluxo de receita regular. Considere uma porcentagem de seu salário para uma poupança ou investimento de longo prazo.\n\n2. **R$200,00** de freelance no dia 15: A fonte de receita adicional é excelente. Tente alocar uma parte disso para investimentos ou para pagar dívidas, caso tenha.\n\n#### Pagamentos:\n1. **R$50,00** no supermercado (dia 3): Revise suas compras e veja se há produtos que podem ser comprados de forma mais econômica.\n\n2. **R$120,00** no restaurante (dia 10): Considere reduzir esse gasto, ou talvez planeje suas refeições de forma mais estratégica para economizar.\n\n3. **R$60,00** no transporte (dia 20): Avalie a possibilidade de caronas ou transporte público para reduzir gastos com locomoção.\n\n4. **R$80,00 na internet (dia 25)**: Verifique se o plano contratado oferece o melhor custo-benefício. Se possível, negocie uma redução ou opte por planos mais baratos.\n\n#### Dicas financeiras:\n- **Equilíbrio de despesas**: Parece que você tem um bom fluxo de receita com o salário e o freelance, mas os gastos com restaurante e supermercado são áreas onde pode haver margem para economia.\n- **Poupar para o futuro**: Uma estratégia de poupança pode ser vantajosa. Considerando que você tem fontes de receita estáveis, investir uma parte de seu ganho extra é uma boa maneira de garantir sua segurança financeira.\n- **Reduzir gastos variáveis**: Verifique oportunidades de reduzir custos variáveis como transporte e alimentação fora de casa.\n\n#### Conclusão: Em resumo, é possível observar que suas finanças estão equilibradas, mas há áreas onde ajustes podem ser feitos para aumentar sua economia e investimento no futuro.";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportsSchema.parse({ month });
  if (!isMatch(month, "MM")) {
    throw new Error("Invalid month");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (!process.env.OPEN_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return DUMMY_REPORT;
  }
  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  if (!openai) {
    throw new Error("Failed to initialize OpenAI");
  }

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  });
  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
        ${transactions
          .map(
            (transaction) =>
              `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
          )
          .join(";")}`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  return completion.choices[0].message.content;
};
