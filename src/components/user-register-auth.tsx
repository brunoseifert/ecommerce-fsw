"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();

  const router = useRouter();

  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "applicaition/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    console.log("USER REGISTER FORM", response);

    if (!request.ok) {
      toast({
        title: "Erro ao registrar",
        description: response.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente novamente">Tente novamente</ToastAction>
        ),
      });
    } else {
      toast({
        title: "Registrado com sucesso",
        description: "Use suas credenciais para entrar",
      });
      console.log(response);
      router.push("/login");
    }

    if (data.password !== data.passwordConfirmation) {
      toast({
        title: "Erro ao registrar",
        description: "A senha e a confirmação de senha não coincidem.",
        variant: "destructive",
        action: (
          <ToastAction altText="Tente novamente">Tente novamente</ToastAction>
        ),
      });
      setIsLoading(false);
      return;
    }

    setData({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className={cn("m-10 grid gap-6", className)} {...props}>
      {/* {JSON.stringify(data)} */}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Nome e Sobrenome"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="passwordConfirmation">
              Confirmar Senha
            </Label>
            <Input
              id="passwordConfirmation"
              placeholder="Confirmar Senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="passwordConfirmation"
              value={data.passwordConfirmation}
              onChange={handleChange}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
}
