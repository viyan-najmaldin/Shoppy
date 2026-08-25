import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase'; // Import your initialized Firebase Auth instance
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword ,
  updateProfile
} from 'firebase/auth';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up action
const signup = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: name
  });

  return userCredential;
};

  // Login action
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout action
  const logout = () => {
    return signOut(auth);
  };

  // Subscribe to changes in the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Authentication check is complete
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Pack up state and methods to pass down to children
  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {/* 
        We only render the children once Firebase has finished checking the active session.
        This prevents unauthorized screen-flashing on page load or refresh.
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook to consume the Auth Context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
