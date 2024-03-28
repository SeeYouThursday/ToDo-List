import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebaseConfig'; // assuming you have a db instance exported from firebase.js

export const queryTodos = (userId: string) => {
  const todosRef = collection(db, 'todos');
  const q = query(todosRef, where('userId', '==', userId));

  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        console.log('New document: ', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('Modified document: ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed document: ', change.doc.data());
      }
    });
  });
};

// onSnapshot(query, (snapshot) => {
//   snapshot.docChanges().forEach((change) => {
//     if (change.type === 'added') {
//       console.log('New document: ', change.doc.data());
//     }
//     if (change.type === 'modified') {
//       console.log('Modified document: ', change.doc.data());
//     }
//     if (change.type === 'removed') {
//       console.log('Removed document: ', change.doc.data());
//     }
//   });
// });
