'use client';

import { useState, useEffect, useContext } from 'react';
import { queryTodos } from '../../../../actions';
import { AuthContext } from '../../GlobalContext';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState<string>(''); // Specify the type of 'user' as string
  const auth = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user?.uid || ''); // Use optional chaining and nullish coalescing operator to access 'uid' property
    });
    console.log(user);
    if (auth.currentUser) {
      auth.currentUser.uid && queryTodos(auth.currentUser.uid); // Access 'uid' property of 'currentUser' when it is available
    }

    // Clean up the onAuthStateChanged listener when the component is unmounted
    return () => unsubscribe();
  }, [auth]);

  return (
    <ul>
      {todos.map((todo: { user_id: string; task: string }) => (
        <li key={todo.user_id}>{todo.task}</li>
      ))}
    </ul>
  );
}

export default Todos;
