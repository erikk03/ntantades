import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; // Import getDocs for collections
import { CircularProgress } from '@nextui-org/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null); // Parent data
    const [kidsData, setKidsData] = useState([]); // Kids' data
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    // Fetch parent data
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        console.log("No parent document found!");
                    }

                    // Fetch kids data
                    const kidsCollectionRef = collection(db, "users", currentUser.uid, "kids")
                    const kidsSnapshot = await getDocs(kidsCollectionRef);
                    const kids = kidsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setKidsData(kids);
                } catch (error) {
                    console.error("Error fetching user or kids data: ", error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    if (loading) {
        return (
            <div className='flex flex-1 justify-center items-center h-screen bg-gray-100'>
                <CircularProgress color="danger" label="Φορτώνει..." />
            </div>
        ); // Loader while data is fetched
    }

    return (
        <AuthContext.Provider value={{ user, userData, kidsData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
