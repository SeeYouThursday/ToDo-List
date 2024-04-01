'use client';
import React from 'react';
import { useState, useEffect } from 'react';
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

export default function TodoForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  // const [] = useState('');

  useEffect(() => {
    //post to firestore db
    //use the task and dueDate to fill
    // use authCurrentUser Context to fill user id
  });

  return (
    <>
      <Button
        onPress={onOpen}
        color="secondary"
        size="lg"
        className="m-2 w-full"
      >
        Just Do This
      </Button>

      <p>Add new to-do</p>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Just Do This:
              </ModalHeader>
              <ModalBody
                style={{
                  backgroundImage: `url('/potatoSmallForm.gif')`,
                  backgroundPosition: 'center',
                }}
              >
                <form>
                  <Input
                    autoFocus
                    label="Task"
                    placeholder="Enter your task"
                    variant="bordered"
                    className="p-4 w-50"
                    onChange={(e) => setTask(e.target.value)}
                  />
                  <Input
                    label="Due Date"
                    placeholder="Calendar"
                    type="time"
                    variant="bordered"
                    className="p-4 w-50"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Do IT...later...maybe
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
