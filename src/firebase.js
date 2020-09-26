import * as fb from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config/firebase';

const firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app();
export default firebase;
