import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import Loading from '../components/Loading/Loading';

export const UserContext = createContext({
  currentUser: null,
});

const UserProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setPending(false);
    });
    return () => unsubscribe();
  }, []);

  if (pending) {
    return <Loading />;
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
