import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from 'Components/Footer';
import AppRouter from "Components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user) {
        SetIsLoggedIn(true);
      } else {
        SetIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
    {init ? < AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
    <Footer />
    </>
  );
}

export default App;
