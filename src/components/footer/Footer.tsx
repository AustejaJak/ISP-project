import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import Routes from "../../routes/routes";
import { SocialMedias } from "./SocialMedias";

const navigation = {
  main: [
    { name: "Pagrindinis puslapis", href: Routes.client.base },
    { name: "Naujienos", href: Routes.client.new },
    { name: "Kolekcija", href: Routes.client.collection },
    { name: "Parduotuvė", href: Routes.client.shop },
    { name: "Paskyra", href: Routes.client.profile },
  ],
  social: SocialMedias,
};

export const Footer: React.FC = () => {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8'>
        <nav
          className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12'
          aria-label='Footer'
        >
          {navigation.main.map((item) => (
            <div key={item.name} className='pb-6'>
              <a
                href={item.href}
                className='text-sm leading-6 text-gray-600 hover:text-gray-900'
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className='mt-10 flex justify-center space-x-10'>
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6' aria-hidden='true' />
            </a>
          ))}
        </div>
        <p className='mt-10 text-center text-xs leading-5 text-gray-500'>
          &copy; 2023 Mūsų kompanija, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
