import { t } from "i18next";
import { UserList } from "../user-list/UserList";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { employersApi } from "../../clients/api/backoffice/employersApi";

export const UserUI = () => {
  const { data: employers, isLoading } = useQuery({
    queryKey: [QueryKey.GET_COMPANY_EMPLOYERS],
    queryFn: employersApi.getCompanyEmployers,
  });

  return (
    <>
      <div className='min-h-full'>
        <div className='bg-gray-800 pb-32'>
          <header className='py-10'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>
                {t("BackofficeEmployersPage.TitleText")}
              </h1>
            </div>
          </header>
        </div>

        <main className='-mt-32'>
          <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
            <div className='rounded-lg bg-white px-5 py-6 shadow sm:px-6'>
              <UserList isLoading={isLoading} employers={employers || []} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
