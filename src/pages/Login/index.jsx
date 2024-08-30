import React from 'react';
import { FormsLogin } from './formsLogin.jsx';

export const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black flex items-center justify-center relative p-4">
        <div className="absolute bottom-4 text-center w-full text-white">
           <p className="text-sm">
            &ldquo;Ver qual o texto para colocar aqui e se fica massa .&rdquo;
           </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col  space-y-6">
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font">
                Criar uma conta / Entrar
              </h1>
              <p className="text-sm text-muted-foreground">
                Digite seu e-mail abaixo para criar ou entrar na conta
              </p>
            </div>
            <FormsLogin />
          </div>
        </div>
      </div>
     </div>
  );
};