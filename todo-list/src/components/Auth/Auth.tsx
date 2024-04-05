// import { AuthContext } from '../../app/GlobalContext';
// const auth = useContext(AuthContext);

import { db, authPromise } from '../../../config/firebaseConfig';

export default async function Auth() {
  const auth = await authPromise;
  
}
