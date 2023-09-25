// DigilockerContext.js
import { createContext, useContext, useState } from 'react';
import { Config, DigiLockerFunctions } from 'digilocker-sdk';

// @ts-ignore
const DigilockerContext = createContext();

export const useDigilocker = () => useContext(DigilockerContext);

export const DigilockerProvider = ({ children }: any) => {
  const [digilockerInstance, setDigilockerInstance]: any = useState(null);

  // Configure Digilocker
  const digilockerConfig: Config = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    callbackURL: `${process.env.REACT_APP_PUBLIC_URL}/documents`,
  };

  // Create an instance of Digilocker
  if (!digilockerInstance) {
    setDigilockerInstance(new DigiLockerFunctions(digilockerConfig));
  }

  return (
    <DigilockerContext.Provider value={digilockerInstance}>
      {children}
    </DigilockerContext.Provider>
  );
};
