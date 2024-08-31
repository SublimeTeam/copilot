import React from 'react';
import { FormsLogin } from './formsLogin.jsx';

export const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black flex items-center justify-center relative p-4">
         <div className="absolute inset-0 flex items-center justify-center text-center text-white">
           <h2 className="text-6xl">Descubra o potencial da IA com o Copiloto.</h2>
         </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col  space-y-6">
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font">
                 Entrar na sua conta
              </h1>
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