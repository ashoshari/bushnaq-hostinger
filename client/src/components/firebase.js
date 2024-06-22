import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAOSoJL5xGxx6gVqmQbPuyHDsbpIHnEY9w",
  authDomain: "bushnaq-group.firebaseapp.com",
  projectId: "bushnaq-group",
  storageBucket: "gs://bushnaq-group.appspot.com",
  messagingSenderId: "287359788847",
  appId: "1:287359788847:web:01f82e2e94f08e22bfe3da",
};

export const app = initializeApp(firebaseConfig);
