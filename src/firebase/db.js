import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getBlob } from 'firebase/storage';
export const saveProject = async (state, userId) => {
  const { title, description } = state;

  const docData = {
    title,
    description,
    title_lower: title.toLowerCase(),
    description_lower: description.toLowerCase(),
    userId: userId,
    published: state.published,
    savedTime: Date.now(),
  };

  const docRef = state.firebaseId
    ? await updateDoc(doc(getProjectCollection(), state.firebaseId), docData)
    : await addDoc(getProjectCollection(), docData);
  const firebaseId = state.firebaseId || docRef.id;
  const storage = getStorage();
  const storageRef = ref(storage, `projects/${userId}/${firebaseId}.json`);
  state.firebaseId = firebaseId;

  const metadata = {
    contentType: 'text/json',
  };

  // Upload the file and metadata
  await uploadBytes(
    storageRef,
    new Blob([JSON.stringify(state)], { type: 'text/json;charset=utf-8' }),
    metadata
  );

  return firebaseId;
};

export const togglePublish = async (firebaseId, published) => {
  await updateDoc(doc(getProjectCollection(), firebaseId), { published });
};

export const downloadProjectFile = async (userId, firebaseId) => {
  const storage = getStorage();
  const storageRef = ref(storage, `projects/${userId}/${firebaseId}.json`);

  const blob = await getBlob(storageRef);
  return await blob.text();
};

export const getProjectsByUserId = async (userId) => {
  const q = query(
    getProjectCollection(),
    where('userId', '==', userId),
    orderBy('savedTime', 'desc')
  );
  const docs = await getDocs(q);
  console.log(docs);
  return docs.docs.map((d) => {
    return { ...d.data(), id: d.id };
  });
};

export const getMostRecentProjects = async (limitNumber) => {
  const q = query(
    getProjectCollection(),
    where('published', '==', true),
    orderBy('savedTime', 'desc'),
    limit(limitNumber)
  );
  const docs = await getDocs(q);
  console.log(docs);
  return docs.docs.map((d) => {
    return { ...d.data(), id: d.id };
  });
};

const getProjectCollection = () => {
  const db = getFirestore();
  return collection(db, 'projects');
};
