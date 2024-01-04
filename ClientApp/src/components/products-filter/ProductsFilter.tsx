import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { categoryProps } from "../../pages/client/category/CategoryPage";
import { FilterProps } from "../../pages/client/category/model";
import { t } from "i18next";

interface ProductsFilterProps {
  children?: React.ReactNode;
  category?: categoryProps;
  filters: FilterProps[];
  setQueryFilters?: (query: string) => void;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  children,
  category,
  filters,
  setQueryFilters,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filterQueries, setFilterQueries] = useState<{
    [key: string]: string[];
  }>({});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let query = "";
    Object.entries(filterQueries).forEach(([keys, values], index) => {
      query += "&";
      query += `${keys}=${values.join(",")}`;
    });
    setQueryFilters?.(query);
  };

  const handleValueChange = (e: any, id: string) => {
    const { value } = e.target;
    if (!e.target.checked) {
      console.log(id);
      const modifiedFilterQuery = filterQueries[id].filter(
        (query: string) => query !== value
      );
      setFilterQueries((prevState) => ({
        ...prevState,
        [id]: modifiedFilterQuery,
      }));
    }
    if (e.target.checked) {
      const modifiedFilterQuery = filterQueries[id]
        ? [...filterQueries[id], value]
        : [value];
      setFilterQueries((prevState) => ({
        ...prevState,
        [id]: modifiedFilterQuery,
      }));
    }
  };

  useEffect(() => {
    console.log(filterQueries);
  }, [filterQueries]);

  return (
    <div className='bg-white'>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-40 lg:hidden'
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>
                  <div className='flex items-center justify-between px-4'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Filters
                    </h2>
                    <button
                      type='button'
                      className='-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500'
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className='mt-4' onSubmit={handleSubmit}>
                    {filters.map((section) => (
                      <Disclosure
                        as='div'
                        key={section.name}
                        className='border-t border-gray-200 pt-4 pb-4'
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className='w-full px-2'>
                              <Disclosure.Button className='flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500'>
                                <span className='text-sm font-medium text-gray-900'>
                                  {section.name}
                                </span>
                                <span className='ml-6 flex h-7 items-center'>
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "-rotate-180" : "rotate-0",
                                      "h-5 w-5 transform"
                                    )}
                                    aria-hidden='true'
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className='px-4 pt-4 pb-2'>
                              <div className='space-y-6'>
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className='flex items-center'
                                  >
                                    <input
                                      id={`${section.id}-${optionIdx}-mobile`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      onChange={(e) =>
                                        handleValueChange(e, section.id)
                                      }
                                      type='checkbox'
                                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                    />
                                    <label
                                      htmlFor={`${section.id}-${optionIdx}-mobile`}
                                      className='ml-3 text-sm text-gray-500'
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                    ))}
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      {t("Filter.SearchText")}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='border-b border-gray-200 pb-10'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
              {category?.title}
            </h1>
            <p className='mt-4 text-base text-gray-500'>
              {category?.description}
            </p>
          </div>

          <div className='pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
            <aside>
              <h2 className='sr-only'>Filters</h2>

              <button
                type='button'
                className='inline-flex items-center lg:hidden'
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className='text-sm font-medium text-gray-700'>
                  Filters
                </span>
                <PlusIcon
                  className='ml-1 h-5 w-5 flex-shrink-0 text-gray-400'
                  aria-hidden='true'
                />
              </button>

              <div className='hidden lg:block'>
                <form
                  onSubmit={handleSubmit}
                  className='space-y-10 divide-y divide-gray-200'
                >
                  {filters.map((section, sectionIdx) => (
                    <div
                      key={section.name}
                      className={sectionIdx === 0 ? "" : "pt-10"}
                    >
                      <fieldset>
                        <legend className='block text-sm font-medium text-gray-900'>
                          {section.name}
                        </legend>
                        <div className='space-y-3 pt-6'>
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className='flex items-center'
                            >
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type='checkbox'
                                onChange={(e) =>
                                  handleValueChange(e, section.id)
                                }
                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className='ml-3 text-sm text-gray-600'
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    {t("Filter.SearchText")}
                  </button>
                </form>
              </div>
            </aside>

            {/* Product grid */}
            <div className='mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsFilter;
