import { Stats } from "../stats/Stats";
import OrderList from "../order-list/OrderList";
import { t } from "i18next";

export default function BackOfficeBaseUi() {
  return (
    <>
      <div className='min-h-full'>
        <div className='bg-gray-800 pb-32'>
          <header className='py-10'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>
                {t("BackofficeBasePage.OrdersTitle")}
              </h1>
            </div>
          </header>
        </div>
      </div>

      <main className='-mt-32'>
        <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
          <div className='rounded-lg bg-white px-5 py-6 shadow sm:px-6'>
            <Stats />
            <OrderList />
          </div>
        </div>
      </main>
    </>
  );
}
