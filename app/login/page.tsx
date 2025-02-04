import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Login = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }

  return (
    <div className="h-full grid-cols-2 md:grid">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center space-y-4 p-8">
        <Image src="/logo.svg" width={173} height={39} alt="finance AI" />
        <h1 className="text-center text-4xl font-bold text-primary md:text-muted-foreground">
          Bem vindo
        </h1>
        <p className="mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant={"outline"}>
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/* DIREITA */}
      <div className="relative hidden h-full w-full sm:block">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
