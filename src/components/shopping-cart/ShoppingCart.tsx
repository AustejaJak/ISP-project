import { Fragment } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import Routes from "../../routes/routes";
import Anchor from "../anchor/Anchor";
import { useCartContext } from "../../context/cartContext";
import { t } from "i18next";

export default function ShoppingCart() {
  const { cart } = useCartContext();
  return (
    <header className='relative'>
      {/* Cart */}
      <Popover className='ml-4 flow-root text-sm lg:relative lg:ml-8'>
        <Popover.Button className='group -m-2 flex items-center p-2'>
          <ShoppingBagIcon
            className='h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-300'
            aria-hidden='true'
          />
          <span className='ml-2 text-sm font-medium text-white group-hover:text-gray-300'>
            {cart.count}
          </span>
          <span className='sr-only'>items in cart, view bag</span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Panel className='absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
            <h2 className='sr-only'>Shopping Cart</h2>

            <ul role='list' className='divide-y divide-gray-200'>
              {cart.products.map(({ product }) => (
                <li key={product.id} className='flex items-center py-6'>
                  <img
                    src={product.images[0].imageUrl}
                    alt=''
                    className='h-16 w-16 flex-none rounded-md border border-gray-200'
                  />
                  <div className='ml-4 flex-auto'>
                    <h3 className='font-medium text-gray-900'>
                      <Anchor href={`/product/${product.id}`}>
                        {product.name}
                      </Anchor>
                    </h3>
                    <p className='text-gray-500'>{product.colors[0].name}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className='mt-3'>
              <Anchor href={Routes.client.checkout}>
                <div className='w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 text-center'>
                  {t("ShoppingBag.Checkout")}
                </div>
              </Anchor>
            </div>
            <p className='mt-6 text-center'>
              <Anchor
                href={Routes.client.shoppingBag}
                className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
              >
                {t("ShoppingBag.ViewBag")}
              </Anchor>
            </p>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}
