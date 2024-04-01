'use client';

import { BeatLoader } from 'react-spinners';
import { AuthContext } from '../GlobalContext';
import { useContext, useState, useEffect } from 'react';
import TodoForm from '../../components/Form/TodoForm';

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
        <BeatLoader loading={loading} />
      ) : (
        <>
          <h1>Welcome, {String(auth?.currentUser.displayName)}</h1>
          <TodoForm />
        </>
      )}
    </div>
  );
};

export default Dashboard;
