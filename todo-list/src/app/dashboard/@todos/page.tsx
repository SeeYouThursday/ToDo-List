'use client';

import { useState, useEffect, useContext } from 'react';
import { queryTodos } from '../../../../actions';
import { AuthContext } from '../../GlobalContext';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState<string>(''); // Specify the type of 'user' as string
  const auth = useContext(AuthContext);

  let num: number = Number('ten');
  console.log(10 + num);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user?.uid || ''); // Use optional chaining and nullish coalescing operator to access 'uid' property
    });
    console.log(user);
    const todoThis = user ? queryTodos(user) : [];
    setTodos(todoThis || []);
    if (auth.currentUser) {
      auth.currentUser.uid && queryTodos(auth.currentUser.uid); // Access 'uid' property of 'currentUser' when it is available
    }

    // Clean up the onAuthStateChanged listener when the component is unmounted
    return () => unsubscribe();
  }, [auth]);

  return (
    <div style={{ marginBottom: 10 }}>
      <Card>
        <CardHeader>
          <h2>Todos Go Here</h2>
        </CardHeader>
        <CardBody>
          <ul>
            {todos.map((todo: { user_id: string; task: string }) => (
              <li key={todo.user_id}>{todo.task}</li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

export default Todos;
