import React from "react";
import Anchor from "../../../components/anchor/Anchor";
import Routes from "../../../routes/routes";
import BasePage from "../../../components/base-page/BasePage";

const IndexPage = () => {
  return (
    <BasePage>
      <div className='flex flex-row w-full justify-end'>
        <Anchor
          href={`${Routes.company.prefix}${Routes.company.createProduct}`}
          className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Pridėti prekę
        </Anchor>
      </div>
      <div className='flex flex-row w-full h-[550px] items-center justify-center gap-5'>
        <Anchor href={`${Routes.company.prefix}${Routes.company.active}`}>
          <div className='border-slate-400 w-[250px] h-[250px] border-2 rounded-lg hover:bg-sky-100'>
            <div className='p-3 flex flex-row items-center justify-center h-full'>
              <h2 className='text-lg font-bold'>Aktyvios prekės</h2>
            </div>
          </div>
        </Anchor>

        <Anchor href={`${Routes.company.prefix}${Routes.company.pending}`}>
          <div className='border-slate-400 w-[250px] h-[250px] border-2 rounded-lg hover:bg-sky-100'>
            <div className='p-3 flex flex-row items-center justify-center h-full'>
              <h2 className='text-lg font-bold'>
                Laukiančios patvirtinimo prekės
              </h2>
            </div>
          </div>
        </Anchor>
      </div>
    </BasePage>
  );
};

export default IndexPage;
