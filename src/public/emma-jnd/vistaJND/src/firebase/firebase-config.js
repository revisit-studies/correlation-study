import { initializeApp } from 'firebase/app';
import {
  arrayUnion, getFirestore, query, updateDoc, where,
} from '@firebase/firestore';
import {
  collection, getDocs, addDoc, doc, setDoc,
} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAuLBoUVElLUzp_h6JFKBpYoRneXfMHt50',
  authDomain: 'literacy-platform.firebaseapp.com',
  projectId: 'literacy-platform',
  storageBucket: 'literacy-platform.appspot.com',
  messagingSenderId: '462151162447',
  appId: '1:462151162447:web:82daa6f990e05631cca83a',
  measurementId: 'G-ZQJNK03481',
};

export const prefix = 'dev-';

export const defaultExpName = 'debug';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// setting path
export const settingPath = 'settings';
export const fb = getFirestore(app);

// const usersCollectionRef = collection(db,"users")
export const addUser = async (user) => await setDoc(doc(fb, 'users', user.ID), user, { merge: true });

export const addDebrief = async (id, values, expName = defaultExpName) => {
  const path = `${expName}-debrief/${id}`;
  return await setDoc(doc(fb, path), values, { merge: true });
};

export const addRecord = async (id, module, attempt, qidx, data, expName) => {
  const path = `${prefix}${expName}-data/${id}-${module}-t${attempt}-q${qidx}`;
  return await setDoc(doc(fb, path), data);
};

export const getAttempt = async (userid = 'test', testName, module) => {
  console.log('get attempt');

  const q = query(collection(fb, `${prefix}users`, userid, testName), where('module', '==', module));
  const attempts = await getDocs(q);
  return attempts.size;
};

export const completeModule = async (userid, testName, module, attempt, score, startTime) => {
  try {
    const userRef = doc(fb, `${prefix}users`, userid);

    await updateDoc(userRef, {
      completed: arrayUnion(`${testName}-${module}`),
    });
    if (module !== 'train') {
      await setDoc(doc(fb, `${prefix}users`, userid, testName, `${module}-t${attempt}`), {
        attempt,
        duration: Date.now() - startTime,
        module,
        timestamp: Date.now(),
        score,
      });
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
