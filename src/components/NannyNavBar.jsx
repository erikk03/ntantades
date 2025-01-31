import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Wallet, HomeIcon, NotepadText, PencilLine } from "lucide-react";
import { MyButton } from '../components/MyButton';
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

const NannyNavBar = ({ handleNavigation }) => {
    const { user, userData, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const nannyFormPaths = ['/nanny/form1', '/nanny/form2', '/nanny/form3', '/nanny/form4'];

    const handleNavClick = (e, path) => {
        e.preventDefault();
        const isNannyFormPage = nannyFormPaths.some((formPath) => location.pathname.startsWith(formPath));
        if (isNannyFormPage) {
            handleNavigation(path); // Trigger modal logic
        } else {
            window.location.href = path; // Direct navigation
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/'; // Redirect to homepage after logout
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    const isParentRoute = location.pathname.includes('/parent');
    const isNannyRoute = location.pathname.includes('/nanny');
    const isHomeRoute = location.pathname === '/nanny';
    const isNannyPaymentsRoute = location.pathname.includes('/nanny/payments');
    const isNannyApplicationsRoute = location.pathname.includes('/nanny/applications');
    const isNannyAdvertismentsRoute = location.pathname.includes('/nanny/advertisments');

    return (
        <div>
            {/* Navigation */}
            <div className="flex justify-center items-center h-5 gap-4 bg-gray-400">
                <div>
                    <MyButton
                        variant={isParentRoute ? 'solid' : 'light'}
                        size="xs"
                        onClick={(e) => handleNavClick(e, '/parent')}
                    >
                        ΓΟΝΕΑΣ
                    </MyButton>
                </div>
                <div>
                    <MyButton
                        variant={isNannyRoute ? 'solid' : 'light'}
                        size="xs"
                        onClick={(e) => handleNavClick(e, '/nanny')}
                    >
                        ΕΠΙΜΕΛΗΤΗΣ/ΤΡΙΑ
                    </MyButton>
                </div>
            </div>

            {/* Navigation Bar */}
            <Navbar isBordered height={55} maxWidth="full">
                {/* Logo Left */}
                <NavbarBrand>
                    <AcmeLogo />
                    <span className="font-bold text-pink-600 cursor-pointer" onClick={(e) => handleNavClick(e, '/')}>
                        ntantades.gr
                    </span>
                </NavbarBrand>

                {/* Buttons Middle */}
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <div className="flex flex-col items-center">
                            <Link
                                to="/nanny/payments"
                                onClick={(e) => handleNavClick(e, '/nanny/payments')}
                                title="ΠΛΗΡΩΜΕΣ"
                            >
                                <Wallet />
                            </Link>
                            <span className="text-xs font-semibold">ΠΛΗΡΩΜΕΣ</span>
                            {isNannyPaymentsRoute && <hr className="w-5 border-black" />}
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="flex flex-col items-center">
                            <Link
                                to="/nanny"
                                onClick={(e) => handleNavClick(e, '/nanny')}
                                title="ΑΡΧΙΚΗ"
                            >
                                <HomeIcon />
                            </Link>
                            <span className="text-xs font-semibold">ΑΡΧΙΚΗ</span>
                            {isHomeRoute && <hr className="w-5 border-black" />}
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="flex flex-col items-center">
                            <Link
                                to="/nanny/applications"
                                onClick={(e) => handleNavClick(e, '/nanny/applications')}
                                title="ΑΙΤΗΣΕΙΣ"
                            >
                                <NotepadText />
                            </Link>
                            <span className="text-xs font-semibold">ΑΙΤΗΣΕΙΣ</span>
                            {isNannyApplicationsRoute && <hr className="w-5 border-black" />}
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="flex flex-col items-center">
                            <Link
                                to="/nanny/advertisments"
                                onClick={(e) => handleNavClick(e, '/nanny/advertisments')}
                                title="ΑΓΓΕΛΙΕΣ"
                            >
                                <PencilLine />
                            </Link>
                            <span className="text-xs font-semibold">ΑΓΓΕΛΙΕΣ</span>
                            {isNannyAdvertismentsRoute && <hr className="w-5 border-black" />}
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
                                radius="md"
                                src={userData?.avatar}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{(userData?.name + " " + userData?.surname) || "No Name"}</p>
                                <p className="font-semibold">{user?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Ρυθμίσεις</DropdownItem>
                            <DropdownItem key="help">Βοήθεια</DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Αποσύνδεση
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div>
    );
};

export default NannyNavBar;
