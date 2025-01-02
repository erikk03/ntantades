import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {Checkbox, Input, Link, Button} from "@nextui-org/react";

import { Mail, Lock } from 'lucide-react';

const LoginPage = ({onLoginSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Authenticate user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User logged in:', user);

      // Get user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log('User profile data:', userData);
        onLoginSuccess(userData); // Pass user data to the parent component
        alert('Login successful!');
      } else {
        console.log('No user profile found in Firestore!');
        alert('No additional user profile found!');
      }
    } catch (err) {
      alert('Error logging in: ' + err.message);
      setError('Error logging in: ' + err.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} className='flex flex-col space-y-8'>
        <Input
          endContent={
            <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="email"
          label="Email"
          labelPlacement='outside'
          // placeholder="Enter your email"
          variant="bordered"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          endContent={
            <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="password"
          label="Κωδικός"
          labelPlacement='outside'
          // placeholder="Enter your password"
          variant="bordered"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Να με θυμάσαι
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            Ξέχασα τον κωδικό μου
          </Link>
        </div>
        
        {/*  */}
        <Button type="submit">Σύνδεση</Button>
      </form>
    </div>
  );
};

export default LoginPage;
