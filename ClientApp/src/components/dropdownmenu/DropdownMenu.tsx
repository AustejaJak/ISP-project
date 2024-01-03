import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ProfileBubble from "../profile-bubble/ProfileBubble";
import { useUserContext } from "../../context/userContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropdownMenuProps {
  navigation: { name: string; href: string }[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ navigation }) => {
  const { userInformation } = useUserContext();
  const { setUserInformation } = useUserContext();
  const handleLogout = (link: { name: string; href: string }) => {
    console.log(link.name);
    if (link.name === "Atsijungti") {
      localStorage.removeItem("credentials");
      localStorage.removeItem("userId");
      setUserInformation({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        roles: [],
        userId: "",
        username: "",
        authenticated: false,
      });
    }
  };
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <ProfileBubble />

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-4 py-3'>
            <p className='text-sm'>Prisijungęs kaip</p>
            <p className='truncate text-sm font-medium text-gray-900'>
              {userInformation.email}
            </p>
          </div>
          {navigation.map((link) => (
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleLogout(link)}
                  href={link.href}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {link.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
