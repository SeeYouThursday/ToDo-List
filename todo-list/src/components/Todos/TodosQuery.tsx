import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db, authPromise } from '../../../config/firebaseConfig';

const TodosQuery = async () => {
  const auth = await authPromise;

  if (!auth.currentUser) {
    console.log('No user is currently authenticated');
    return <h2>Oops!</h2>;
  }

  const myUserId = auth.currentUser.uid;
  console.log(myUserId);

  const querySnapshot = await getDocs(
    query(collection(db, 'users'), where('userId', '==', myUserId))
  );

  if (querySnapshot.empty) {
    console.log('No user found with the given userId');
    return <>{}</>;
  }

  const user = querySnapshot.docs[0].data();
  return <>{}</>;
};

export default TodosQuery;
