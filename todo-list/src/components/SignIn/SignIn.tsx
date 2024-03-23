import { useState, useMemo } from 'react';
import { auth, googleProvider } from '../../../config/firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from '@tabler/icons-react';
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { MailIcon } from '../ui/MailIcon.jsx';
import { LockIcon } from '../ui/LockIcon.jsx';
import { setTimeout } from 'timers';

export default function SignIn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const [error, setError] = useState(false);
  const [reentered, setReentered] = useState('');
  const [success, setSuccess] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const handleSignedUp = () => {
    setTimeout(() => {
      setSignedUp(true);
    }, 100);
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      handleSignedUp();
    } catch (err) {
      setError(true);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      handleSignedUp();
    } catch (err) {
      console.log(error);
    }
  };

  // const signInWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //   } catch (err) {
  //     setError(true);
  //   }
  // };

  // !Future Dev above
  const validateEmail = (email: string) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === '') return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(false);
    e.preventDefault();
    // if (signingUp) {
    //make sure password matches reentry
    //handle form data
    //db action here
    // }
    console.log('submit');
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

    //write db login here
  };

  signedUp ? (
    <div>
      <Button onPress={onOpen} color="secondary" size="lg" className="m-2">
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent className="m-auto">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>

              <ModalBody>
                <form
                  onSubmit={handleSubmit}
                  className="flex-col py-2 px-1 justify-between"
                >
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
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password: at least 6 characters long"
                    placeholder={
                      signingUp ? 'New Password' : 'Enter your password'
                    }
                    type="password"
                    variant="bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    labelPlacement="inside"
                    // isInvalid={error ? true : false}
                  />
                  {!signingUp ? null : (
                    <Input
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
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
                    {/* {error ? (
                      <p className="text-danger">
                        Incorrect Email or Password. Please try again.
                      </p>
                    ) : null} */}
                    {!signingUp ? (
                      <>
                        <Button
                          type="submit"
                          role="submit"
                          color="primary"
                          onPress={() => setSigningUp(false)}
                        >
                          Login
                        </Button>
                        <Button
                          type="button"
                          role="button"
                          onPress={() => setSigningUp(true)}
                          className="bg-white"
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
                {/* <Checkbox
                    classNames={{
                      label: 'text-small',
                    }}
                  >
                    Remember me
                  </Checkbox> */}
                {/* <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link> */}
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  ) : null;
}
