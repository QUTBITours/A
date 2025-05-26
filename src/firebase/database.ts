import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  Timestamp, 
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

// Generic function to add a document to a collection
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    return { id: null, error };
  }
};

// Generic function to update a document in a collection
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return { success: true, error: null };
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    return { success: false, error };
  }
};

// Generic function to delete a document from a collection
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { success: true, error: null };
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    return { success: false, error };
  }
};

// Generic function to get all documents from a collection
export const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { documents, error: null };
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    return { documents: [], error };
  }
};

// Generic function to get a document by ID
export const getDocumentById = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { document: { id: docSnap.id, ...docSnap.data() }, error: null };
    } else {
      return { document: null, error: new Error('Document not found') };
    }
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    return { document: null, error };
  }
};

// Function to query documents by date range
export const getDocumentsByDateRange = async (
  collectionName: string, 
  startDate: Date, 
  endDate: Date, 
  dateField: string = 'createdAt'
) => {
  try {
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);
    
    const q = query(
      collection(db, collectionName),
      where(dateField, '>=', startTimestamp),
      where(dateField, '<=', endTimestamp),
      orderBy(dateField, 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { documents, error: null };
  } catch (error) {
    console.error(`Error querying documents from ${collectionName} by date range:`, error);
    return { documents: [], error };
  }
};

// Function to get all documents from the current month
export const getCurrentMonthDocuments = async (collectionName: string, dateField: string = 'createdAt') => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  
  return getDocumentsByDateRange(collectionName, startOfMonth, endOfMonth, dateField);
};