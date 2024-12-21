import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MyButton } from '../components/MyButton';


const HomePage = () => {
    const location = useLocation();

    // Determine if the current route is the parent route
    const isParentRoute = location.pathname.includes('/parent');
    // Determine if the current route is the nanny route
    const isNannyRoute = location.pathname.includes('/nanny');

    return (
    <div>
        <header className="flex justify-center items-center h-5 gap-4">
            <div >
                <MyButton color='default' variant={isParentRoute ? 'solid' : 'light'} size='xs'>
                    <Link to="/parent">ΓΟΝΕΑΣ</Link>
                </MyButton>
                </div>
                <div>
                <MyButton color='default' variant={isNannyRoute ? 'solid' : 'light'} size='xs'>
                    <Link to="/nanny">ΕΠΙΜΕΛΗΤΗΣ/ΤΡΙΑ</Link>
                </MyButton>
            </div>
        </header>
        <header className="header">
            <Link to="/">ntantades.gr</Link>
        </header>

        <main className="">

            <section className="">
                <div>
                    
                </div>
                <div>
                    
                </div>
            </section>
        </main>
    </div>
  );
};

export default HomePage;