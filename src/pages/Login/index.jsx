import { FormsLogin } from "./FormsLogin.jsx";

export const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col  space-y-6">
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font">Entrar na sua conta</h1>
              <p className="text-sm text-muted-foreground">
                Digite seu e-mail e senha para acessar sua conta
              </p>
            </div>
            <FormsLogin />
          </div>
        </div>
      </div>
    </div>
  );
};
