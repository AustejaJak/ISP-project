import React from 'react';
import Anchor from "../anchor/Anchor";
import Routes from "../../routes/routes";
import DropdownMenu from "../dropdownmenu/DropdownMenu";
import ShoppingCart from "../shopping-cart/ShoppingCart";

const navigation = [
  { name: "Naujienos", href: Routes.client.new },
  { name: "Kolekcija", href: Routes.client.collection },
  { name: "Parduotuvė", href: Routes.client.shop },
];

const isAuthenticated = true;

const Header = () => {
  return (
      <header className='bg-indigo-600 relative'> {/* Add relative positioning */}
        <nav className='mx-auto max-w-7xl px-6 lg:px-8' aria-label='Top'>
          <div className='flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none relative z-10'> {/* Add relative and z-10 to the container */}
            <div className='flex items-center'>
              <Anchor href='/'>
                <span className='sr-only'>Your Company</span>
                <img
                    className='h-10 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=white'
                    alt=''
                />
              </Anchor>
              <div className='ml-10 hidden space-x-8 lg:block'>
                {navigation.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className='text-base font-medium text-white hover:text-indigo-50'
                    >
                      {link.name}
                    </a>
                ))}
              </div>
              {/* <SearchBox /> */}
            </div>
            <div className='flex items-center space-x-4 absolute right-6 top-6'> {/* Absolute positioning */}
              {!isAuthenticated ? (
                  <>
                    <Anchor
                        href='/log-in'
                        className='inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75'
                    >
                      Sign in
                    </Anchor>
                    <Anchor
                        href='/sign-up'
                        className='inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50'
                    >
                      Sign up
                    </Anchor>
                  </>
              ) : (
                  <div className='flex items-center space-x-0'>
                    <DropdownMenu />
                    <ShoppingCart />
                  </div>
              )}
            </div>
          </div>
          <div className='flex flex-wrap justify-center gap-x-6 py-4 lg:hidden'>
            {navigation.map((link) => (
                <Anchor
                    key={link.name}
                    href={link.href}
                    className='text-base font-medium text-white hover:text-indigo-50'
                >
                  {link.name}
                </Anchor>
            ))}
          </div>
        </nav>
      </header>
  );
};

export default Header;
