import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from 'components/Footer';
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      user ? setUserObj(user) : setUserObj(null);
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
