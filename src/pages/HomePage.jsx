import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import {Card, CardBody} from "@nextui-org/react"
import { Button } from '@nextui-org/react';


const HomePage = () => {
  return (
    <div>
      <header className="header">
        <Link to="/">ntantades.gr</Link>
      </header>

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
            <Button color='default' variant='solid'>
              <Link to="/parent">Συνέχεια ως γονέας/κηδεμόνας</Link>
            </Button>
          </div>
          <div>
            <Button color='default' variant='solid'>
              <Link to="/nanny">Συνέχεια ως επιμελητής/τρια</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 ntantades.gr - All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
