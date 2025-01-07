// General
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import { useAuth } from '../config/AuthContext';

// Components
import { Card, CardBody} from "@nextui-org/react"
import { Button } from '@nextui-org/react';
import { Navbar, NavbarBrand} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import LoginPage from './LoginPage';

export const AcmeLogo = () => {
    return (
      <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );
  };

const HomePage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [path, setPath] = React.useState('');

  // Close modal and redirect to a specific page
  const handleLoginSuccess = () => {
      onOpenChange(false); // Close the modal
      navigate(path); // Redirect to the desired page
  };

  // Handle button click and set the corresponding redirect path
  const handleButtonClick = (paramenter) => {
    if (user) {
        navigate(paramenter);   // If user is already authenticated, navigate immediately
    } else {
        setPath(paramenter);    // Set the redirect path
        onOpen();                     // Open the modal
    }
  };

  return (
    <div>
      <Navbar>
        <NavbarBrand className='flex justify-center items-center'>
          <AcmeLogo />
          <Link className='font-bold text-pink-600' to="/">ntantades.gr</Link>
        </NavbarBrand>
      </Navbar>

      <main className="main">
        <section>
          <Card radius='md' shadow='md'>
            <CardBody>
            <p className="text-center">Καλώς ήρθατε στην πλατφόρμα κατ’οίκον φροντίδας παιδιών ηλικίας απο 2 μηνών έως 2,5 ετών </p>
            </CardBody>
          </Card>
        </section>

        <section className="button-section">
          <div>
            <Button className="font-semibold" color='default' variant='solid' onPress={() => handleButtonClick('/parent')}>Συνέχεια ως γονέας/κηδεμόνας</Button>
          </div>
          <div>
            <Button className="font-semibold" color='default' variant='solid' onPress={() => handleButtonClick('/nanny')}>Συνέχεια ως επιμελητής/τρια</Button>
          </div>
        </section>
      </main>
      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <LoginPage onLoginSuccess={() => handleLoginSuccess()} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <footer className="footer">
        <p>© 2024 ntantades.gr - All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
