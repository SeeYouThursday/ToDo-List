import { ListboxItem } from '@nextui-org/react';

const Todo = ({ id }: { id: string }) => {
  //task, date, time, delete btn, edit btn
  return <ListboxItem key={id}>Boop</ListboxItem>;
};

export default Todo;
