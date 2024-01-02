import React from "react";
import Anchor from "../anchor/Anchor";
import { DropdownMenu } from "../dropdownmenu/DropdownMenu";
import ShoppingCart from "../shopping-cart/ShoppingCart";
import { useUserContext } from "../../context/userContext";

interface HeaderProps {
  navigation: { name: string; href: string }[];
  profileNavigation: { name: string; href: string }[];
  isCompany?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  navigation,
  profileNavigation,
  isCompany = false,
}) => {
  const { userInformation } = useUserContext();
  return (
    <header className='bg-indigo-600 relative'>
      <nav className='mx-auto max-w-7xl px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none relative z-10'>
          <div className='flex items-center'>
            <Anchor href='/'>
              <img
                className='h-10 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=white'
                alt=''
              />
            </Anchor>
            <div className='ml-10 hidden space-x-8 lg:block'>
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
          </div>
          <div className='flex items-center space-x-4 absolute right-6 top-6'>
            {!userInformation.authenticated ? (
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
                <DropdownMenu navigation={profileNavigation} />
                {!isCompany && <ShoppingCart />}
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
