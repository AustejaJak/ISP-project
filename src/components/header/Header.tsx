import Anchor from "../anchor/Anchor";
import SearchBox from "../searchbox/SearchBox";
import Routes from "../../routes/routes";
import ProfileBubble from "../profile-bubble/ProfileBubble";

const navigation = [
  { name: "New", href: Routes.client.new },
  { name: "Collection", href: "#" },
  { name: "Shop", href: Routes.client.shop },
];

const isAuthenticated = true;

const Header = () => {
  return (
    <header className='bg-indigo-600'>
      <nav className='mx-auto max-w-7xl px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none'>
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
          {!isAuthenticated ? (
            <div className='ml-10 space-x-4'>
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
            </div>
          ) : (
            <ProfileBubble />
          )}
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
