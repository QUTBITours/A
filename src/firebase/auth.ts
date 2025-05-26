import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { user: null, error };
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};