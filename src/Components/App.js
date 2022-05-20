import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import Footer from 'components/Footer';
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: () => updateProfile(user, {
            displayName: user.displayName
          })
        })
        if(!user.displayName) {
          user.displayName = user.email.split('@')[0];
        }
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: () => updateProfile(user, {
        displayName: user.displayName
      })
    });
  }
  return (
    <>
      {init ? < AppRouter isLoggedIn={userObj} userObj={userObj} refreshUser={refreshUser} /> : "Initializing..."}
      <Footer />
    </>
  );
}

export default App;
