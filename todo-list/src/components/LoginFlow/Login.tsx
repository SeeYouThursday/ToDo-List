import { useState, useEffect, useMemo } from 'react';
//validation/authorization
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
// DB Imports
import { collection, addDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../../../config/firebaseConfig.js';
import { validateEmail } from '../../app/_lib/utils/helper.ts';
// UI Imports
import { Button, Input } from '@nextui-org/react';
import { MailIcon } from '../../components/ui/MailIcon.jsx';
import { LockIcon } from '../../components/ui/LockIcon.jsx';

const LoginForm = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reentered, setReentered] = useState('');
  //used to conditionally render login modal btn
  const [signingUp, setSigningUp] = useState(false);
  //used for error handling/validation on form
  const [error, setError] = useState(false);
  //used for showing success message on login/signup
  const [success, setSuccess] = useState(false);
  //tracks whether the user is signed in -//?? consider changing to useContext

  const [signedUp, setSignedUp] = useState(() => {
    if (typeof window !== 'undefined') {
      const signedUpLs = localStorage.getItem('signedUp');
      return signedUpLs === 'true';
    }
    return false;
  });

  //tracks whether the user is signed in -//?? consider changing to useContext
  useEffect(() => {
    localStorage.setItem('signedUp', String(signedUp));
  }, [signedUp]);
  const handleSignedUp = async () => {
    setTimeout(() => {
      setSignedUp(true);
    }, 100);
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser) {
        throw new Error();
      }
      await updateProfile(auth.currentUser, { displayName: firstName });
      // Create a user in the 'users' collection

      //stores user info in userDoc
      const userDoc = {
        uid: auth.currentUser.uid,
        email: email,
        displayName: firstName,
      };
      //creates the user in 'users'
      const docRef = await addDoc(collection(db, 'users'), userDoc);

      console.log(`Document written with ID: ${docRef.id}`);

      setSuccess(true);
      setSignedUp(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setSignedUp(true);
      handleSignedUp();
    } catch (err) {
      console.log(error);
    }
  };

  const isInvalid = useMemo(() => {
    if (email === '') return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(false);
    e.preventDefault();
    try {
      if (signingUp) {
        const newUser = await signUp();
        setEmail('');
        setPassword('');
        setReentered('');
        return newUser;
      }
      const user = await signIn();
      setEmail('');
      setPassword('');
      return user;
    } catch (err) {
      setError(true);
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-col py-2 px-1 justify-between"
    >
      {!signingUp ? null : (
        <Input
          autoFocus
          label="First Name"
          placeholder="Enter your first name"
          variant="bordered"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          isInvalid={isInvalid}
          className="mb-2"
        >
          First Name
        </Input>
      )}
      <Input
        autoFocus
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isInvalid={isInvalid}
        className="mb-2"
      />
      <Input
        description="at least 6 characters long"
        label="Password"
        placeholder={signingUp ? 'New Password' : 'Enter your password'}
        type="password"
        variant="bordered"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        labelPlacement="inside"
        // isInvalid={error ? true : false}
      />
      {!signingUp ? null : (
        <Input
          label="Re-enter Password"
          placeholder="Re-enter your password"
          type="password"
          variant="bordered"
          value={reentered}
          onChange={(e) => setReentered(e.target.value)}
          labelPlacement="inside"
          isInvalid={password !== reentered}
          errorMessage="Passwords must match"
          className="mb-2"
        />
      )}
      <div className="flex justify-between flex-col mt-2">
        {error ? (
          <p className="text-danger">
            Incorrect Email or Password. Please try again.
          </p>
        ) : null}
        {!signingUp ? (
          <>
            <Button
              type="submit"
              role="submit"
              color="primary"
              onPress={() => setSigningUp(false)}
              className="mb-2"
            >
              Login
            </Button>
            <Button
              type="button"
              role="button"
              onPress={() => setSigningUp(true)}
              className="mb-2"
            >
              Sign Up for an Account
            </Button>
          </>
        ) : null}
        {signingUp ? (
          <Button type="submit" role="submit" className="bg-white">
            Sign Up for an Account
          </Button>
        ) : null}
        {success ? <p className="success">Success!</p> : null}
      </div>
    </form>
  );
};

export default LoginForm;
