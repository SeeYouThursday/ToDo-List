'use client';

import { AuthContext } from '../GlobalContext';
import { useContext, useState, useEffect } from 'react';

const Dashboard = ({}) => {
  const auth = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="m-5 gap-2">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <h1>Welcome, {String(auth.currentUser.displayName)}</h1>
      )}
      <></>
    </div>
  );
};

export default Dashboard;
