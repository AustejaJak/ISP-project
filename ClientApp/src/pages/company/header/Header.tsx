import Anchor from "../../../components/anchor/Anchor";
import Routes from "../../../routes/routes";

const navigation = [
  { name: "Aktyvūs", href: `${Routes.company.prefix}${Routes.company.active}` },
  {
    name: "Laukiantys patvirtinimo",
    href: `${Routes.company.prefix}${Routes.company.pending}`,
  },
];

const Header = () => {
  return (
    <header className='bg-indigo-600'>
      <nav className='mx-auto max-w-7xl px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none'>
          <div className='flex items-center'>
            <Anchor href={Routes.company.prefix}>
              <span className='sr-only'>Your Company</span>
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
            {/* <SearchBox /> */}
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
