'use client';

import { AuthContext } from '../GlobalContext';
import { useContext, useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
const Dashboard = ({
  children,
  clock,
  todos,
}: {
  children: React.ReactNode;
  clock: React.ReactNode;
  todos: React.ReactNode;
}) => {
  const auth = useContext(AuthContext);
  console.log(auth);

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
      <>
        {children}
        <h2>Todos Go Here</h2>
        {clock}
        <div className="flex flex-col me-auto ms-auto">
          <Card className="m-2">
            <CardHeader></CardHeader>
            <CardBody>Bloop</CardBody>
          </Card>
        </div>
      </>
    </div>
  );
};

export default Dashboard;
