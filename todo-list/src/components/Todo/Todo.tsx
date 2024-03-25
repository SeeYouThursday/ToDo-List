import { useState, useEffect } from 'react';
import { ListboxItem, Button } from '@nextui-org/react';
import TodoForm from '../Form/TodoForm';
import { db } from '../../../config/firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
interface Todo {
  task: string;
  timestamp: Date;
  id: string;
  completed: boolean;
  user_id: string;
}

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    //orderBy used to sort results of query
    const q = query(collection(db, 'tasks'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Todo))
      ); // Add 'as Todo' to ensure type compatibility
      // setInput("") //not sure what this does
    });
    return unsubscribe;
  }, []); //will query tasks on load of component

  //task, date, time, delete btn, edit btn

  return (
    <>
      {todos.map((todo) => {
        return (
          <ListboxItem key={todo.id}>
            {todo.task} to be completed by {todo.timestamp.toString()}
            <Button>Delete</Button>
            {!todo.completed ? <TodoForm editable={false} /> : null}
          </ListboxItem>
        );
      })}
    </>
  );
};

export default Todo;
