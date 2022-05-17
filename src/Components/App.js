import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Footer from 'Components/Footer';
import AppRouter from "Components/Router";

function App() {
  const authService = getAuth();
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
    {init ? < AppRouter isLoggedIn={userObj} userObj={userObj} /> : "Initializing..."}
    <Footer />
    </>
  );
}

export default App;
