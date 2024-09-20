// AIContext.js
import React, { createContext, useState } from 'react';

// Context oluştur
const AIContext = createContext();

// Context sağlayıcıyı oluştur
const AIProvider = ({ children }) => {
  const [aiData, setAiData] = useState([]);
  const [userToken, setUserToken] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');


  return (
    <AIContext.Provider value={{ aiData, setAiData , userToken, setUserToken, userEmail, setUserEmail, userName, setUserName}}>
      {children}
    </AIContext.Provider>
  );
};

export {AIContext, AIProvider};
