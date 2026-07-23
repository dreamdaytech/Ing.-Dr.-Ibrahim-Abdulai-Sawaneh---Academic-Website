import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';
import { Publication, Book, BlogPost, TalkEvent, TimelineItem } from '../types';

const app = initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
});

// Initialize firestore with the custom databaseId and force long polling to prevent iframe connection issues
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
export const storage = getStorage(app);

// Upload file helper
export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error(`Error uploading file to ${path}:`, error);
    throw error;
  }
}

// Generic fetch helper
export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    const items: T[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as T);
    });
    return items;
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    throw error;
  }
}

// Generic save helper
export async function saveDocument(collectionName: string, id: string, data: any): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error(`Error saving document in ${collectionName}/${id}:`, error);
    throw error;
  }
}

// Generic delete helper
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document ${collectionName}/${id}:`, error);
    throw error;
  }
}

// Batch seed function
export async function seedDatabase(data: {
  publications: Publication[];
  books: Book[];
  blogPosts: BlogPost[];
  talkEvents: TalkEvent[];
  timelineItems: TimelineItem[];
  heroInfo?: any;
  biographyDetails?: any;
  galleryImages?: any[];
}): Promise<void> {
  try {
    // Seed Publications
    for (const item of data.publications) {
      await saveDocument('publications', item.id, item);
    }
    // Seed Books
    for (const item of data.books) {
      await saveDocument('books', item.id, item);
    }
    // Seed Blog Posts
    for (const item of data.blogPosts) {
      await saveDocument('blogPosts', item.id, item);
    }
    // Seed Talk Events
    for (const item of data.talkEvents) {
      await saveDocument('talkEvents', item.id, item);
    }
    // Seed Timeline Items
    for (const item of data.timelineItems) {
      await saveDocument('timelineItems', item.id, item);
    }
    // Seed Profile documents if present
    if (data.heroInfo) {
      await saveDocument('profile', 'hero', { ...data.heroInfo, isProfile: true, title: 'Scholarly Hero Section Details' });
    }
    if (data.biographyDetails) {
      await saveDocument('profile', 'biography', { ...data.biographyDetails, isProfile: true, title: 'Scholarly Biography & Vision' });
    }
    if (data.galleryImages) {
      for (const item of data.galleryImages) {
        await saveDocument('galleryImages', item.id, item);
      }
    }
    console.log('Database successfully seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
