import { useState, useMemo, useEffect, useContext } from 'react';

// Authentication Imports
import { onAuthStateChanged, User } from 'firebase/auth';
import { AuthContext } from '../GlobalContext';

// UI Imports
import LoginForm from '@/components/LoginFlow/Login.tsx';
import BeatLoader from 'react-spinners/BeatLoader';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

export default function LoginFlow() {
  // handles opening/closing the modal login form
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);
  //used to conditionally render login modal btn
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
    <>
      <BeatLoader loading={loading} />
      {!user || !loading ? (
        <>
          <Button
            onPress={onOpen}
            color="secondary"
            size="lg"
            className="w-full mb-2"
          >
            Login
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent className="m-auto">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Log in
                  </ModalHeader>

                  <ModalBody>
                    {/* Future Dev: move Login Form to its own component in @/components/LoginFlow  */}
                    <LoginForm />
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
        </>
      ) : null}
    </>
  );
}

// const signInWithGoogle = async () => {
//   try {
//     await signInWithPopup(auth, googleProvider);
//   } catch (err) {
//     setError(true);
//   }
// };

// !Future Dev above
