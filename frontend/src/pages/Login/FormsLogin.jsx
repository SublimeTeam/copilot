import * as React from "react";
import { cn } from "@/utils";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/Button/index.jsx";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  return password.length > 4;
};

export function FormsLogin({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/chat");
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsEmailValid(isValidEmail(emailValue));
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    setIsPasswordValid(isValidPassword(passwordValue));
  };

  const isButtonDisabled = !isEmailValid || !isPasswordValid || isLoading;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <h3 className="sr-only" htmlFor="email">
              Email
            </h3>
            <Input
              id="email"
              placeholder="exemplo@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="grid gap-1">
            <h3 className="sr-only" htmlFor="password">
              Senha
            </h3>
            <Input
              id="password"
              placeholder="Senha"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button
            className="relative flex items-center justify-center"
            onClick={handleButtonClick}
          >
            {isLoading && (
              <i
                className="fa fa-circle-o-notch fa-spin"
                style={{ fontSize: "24px", position: "absolute" }}
              ></i>
            )}
            Entrar
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou</span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex gap-4 items-center"
        onClick={() => navigate("/contact")}
      >
        Entrar em contato
      </Button>
    </div>
  );
}
