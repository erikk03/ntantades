import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MyButton } from '../components/MyButton';
import { Button, ButtonGroup } from '@nextui-org/react';
import { HomeIcon, Wallet, NotepadText } from "lucide-react";


const ParentPage = () => {
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
        <header className="parentHeader flex items-center px-4 py-2">  
            <Link to="/" className=' text-left'>ntantades.gr</Link>
            <div className='flex flex-1 justify-center items-center gap-4'>
                {/* <ButtonGroup> */}
                    <Button color='default' variant='light' size='sm'>
                        <Link to="/" title='ΠΛΗΡΩΜΕΣ'>
                            <Wallet />
                        </Link>
                    </Button>
                    <Button color='default' variant='light' size='sm'>
                        <Link to="/" title='ΑΡΧΙΚΗ'>
                            <HomeIcon />
                        </Link>
                    </Button>
                    <Button color='default' variant='light' size='sm'>
                        <Link to="/" title='ΑΙΤΗΣΕΙΣ'>
                            <NotepadText />
                        </Link>
                    </Button>
                {/* </ButtonGroup> */}
            </div>
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

export default ParentPage;