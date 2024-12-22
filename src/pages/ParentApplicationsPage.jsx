import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MyButton } from '../components/MyButton';
import { HomeIcon, Wallet, NotepadText } from "lucide-react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAuth } from '../config/AuthContext';

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

const ParentApplicationsPage = () => {
    const location = useLocation();
    const { user } = useAuth();

    // Determine if the current route is the parent route
    const isParentRoute = location.pathname.includes('/parent');
    // Determine if the current route is the nanny route
    const isNannyRoute = location.pathname.includes('/nanny');
    // Determine if the current route is the home route
    const isHomeRoute = location.pathname === '/parent';
    // Determine if the current route is the ParentPayments route
    const isParentPaymentsRoute = location.pathname.includes('/parent/payments');
    // Determine if the current route is the ParentApplications route
    const isParentApplicationsRoute = location.pathname.includes('/parent/applications');

    return (
    <div>
        {/* Navigation */}
        <div className="flex justify-center items-center h-5 gap-4">
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
        </div>

        {/* Navigation Bar */}
        <Navbar>
            {/* Logo Left */}
            <NavbarBrand>
                <AcmeLogo />
                <Link className='font-bold text-pink-600' to="/">ntantades.gr</Link>
            </NavbarBrand>

            {/* Buttons Middle */}
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <div className="flex flex-col items-center">
                        <Link to="/parent/payments" title='ΠΛΗΡΩΜΕΣ'>
                            <Wallet />
                        </Link>
                        <span className="text-xs font-semibold">ΠΛΗΡΩΜΕΣ</span>
                        {isParentPaymentsRoute && <hr className="w-5 border-black" />}
                    </div>
                </NavbarItem>
                <NavbarItem>
                    <div className="flex flex-col items-center">
                        <Link to="/parent" title='ΑΡΧΙΚΗ'>
                            <HomeIcon />
                        </Link>
                        <span className="text-xs font-semibold">ΑΡΧΙΚΗ</span>
                        {isHomeRoute && <hr className="w-5 border-black" />}
                    </div>
                </NavbarItem>
                <NavbarItem>
                    <div className="flex flex-col items-center">
                        <Link to="/parent/applications" title='ΑΙΤΗΣΕΙΣ'>
                            <NotepadText />
                        </Link>
                        <span className="text-xs font-semibold">ΑΙΤΗΣΕΙΣ</span>
                        {isParentApplicationsRoute && <hr className="w-5 border-black" />}
                    </div>
                </NavbarItem>
            </NavbarContent>

            {/* Avatar Right */}
            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                    <Avatar
                        showFallback
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="danger"
                        size="sm"
                        src={user.photoURL}
                    />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">{user.displayName}</p>
                            <p className="font-semibold">{user.email}</p>
                        </DropdownItem>
                        <DropdownItem key="settings">Ρυθμίσεις</DropdownItem>
                        <DropdownItem key="help">Βοήθεια</DropdownItem>
                        <DropdownItem key="logout" color="danger">Αποσύνδεση</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>

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

export default ParentApplicationsPage;
