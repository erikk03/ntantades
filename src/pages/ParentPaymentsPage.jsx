import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MyButton } from '../components/MyButton';


const ParentPaymentsPage = () => {
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
            <div>
                <h1>Parent Payments Page</h1>
                <p>This is the payments page under /parent.</p>
            </div>
        </main>
    </div>
  );
};
export default ParentPaymentsPage;
