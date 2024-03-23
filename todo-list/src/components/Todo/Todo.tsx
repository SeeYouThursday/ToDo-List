import { useState, useEffect } from 'react';
import { ListboxItem, Button } from '@nextui-org/react';
import { db } from '../../../config/firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
interface Todo {
  task: string;
  time: Date;
  id: string;
}

const Todo = ({ task, time, id }: Todo) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    //orderBy used to sort results of query
    const q = query(collection(db, 'tasks'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Todo))); // Add 'as Todo' to ensure type compatibility
      // setInput("") //not sure what this does
    });
    return unsubscribe;
  }, []); //will query tasks on load of component

  //task, date, time, delete btn, edit btn
  return (
    <ListboxItem key={id}>
      {task} to be completed by {time.toString()}
      <Button>Delete</Button>
      <Button>Edit</Button>
    </ListboxItem>
  );
};

export default Todo;
