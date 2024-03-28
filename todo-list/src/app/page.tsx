'use client';
import { useEffect, useState, useContext } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Button,
  Slider,
  CardFooter,
  Divider,
} from '@nextui-org/react';
import SignUp from '@/app/login/page';
import TodoForm from '@/components/Form/TodoForm';
//import Authentication
import { AuthContext } from './GlobalContext';
import { onAuthStateChanged } from 'firebase/auth';

//Conditionally render ToDo Form Modal vs the login/signup btn in the card
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Clean up the onAuthStateChanged listener when the component is unmounted
    return () => unsubscribe();
  }, []);
  return (
    <div
      className="flex flex-col lg:justify-center lg:items-center mx-4 space-x-3"
      style={{ height: '80vh', marginLeft: '10%', marginRight: '10%' }}
    >
      {/* <h1 className="name">Do This Or Else</h1> */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="name">Do This Or Else</h1>
        {/* <h2 className="subheading italic">Stop Complaining, just do it.</h2> */}
      </div>
      <div className="flex flex-row justify-center gap-3">
        <Card
          isBlurred={true}
          className="flex flex-col items-center justify-center mx-6"
        >
          <CardBody className="flex flex-row justify-center items-start flex-wrap overflow-hidden">
            <p className="md:w-13 md:mx-7 text-9xl" id="hook">
              Tired of being nagged or just not getting anything done? Sign up
              today for a simple reminder to not be a coach potato so you can
              just
              <em> DO IT.</em>...or else
            </p>
          </CardBody>
          <CardFooter className="flex flex-col">
            <Image
              src="/mad-potato.png"
              width={200}
              alt="female potato mad at male potato on a couch"
              className="me-3 ms-3"
            ></Image>{' '}
          </CardFooter>
        </Card>
        <Card
          isBlurred={true}
          className="flex flex-col items-center justify-center ms-3 p-4"
        >
          <h2>Do This</h2>
          {user ? null : <SignUp />}
          {loading ? <div>Loading...</div> : null}
          <TodoForm editable={false} />
        </Card>
      </div>
    </div>
  );
}
