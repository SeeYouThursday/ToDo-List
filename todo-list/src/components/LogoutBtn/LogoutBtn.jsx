import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import { Button, Modal } from '@nextui-org/react';

const LogoutBtn = () => {
  const [loggedout, setLoggedOut] = useState(false);
  const checkLoginStatus = localStorage.getItem('signedUp');
  const logout = async () => {
    try {
      console.log('loggedout');
      await signOut(auth);
      setLoggedOut(true);
      localStorage.setItem('signedUp', 'false');
      return (
        <Modal>
          <p>Logged Out!</p>
        </Modal>
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {checkLoginStatus || loggedout ? (
        <Button onPress={logout}>Log Out</Button>
      ) : (
        <p>'poop'</p>
      )}
    </>
  );
};

export default LogoutBtn;
