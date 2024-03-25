'use client';
import Todo from '@/components/Todo/Todo';
import { AuthContext } from '../GlobalContext';
import { useContext } from 'react';
const Dashboard = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <>
      <h2>Todos Go Here</h2>
      <Todo></Todo>
    </>
  );
};

export default Dashboard;
