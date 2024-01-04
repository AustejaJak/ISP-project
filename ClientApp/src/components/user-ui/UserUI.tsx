import { t } from "i18next";
import { UserList } from "../user-list/UserList";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { clientApi } from "../../clients/api/clientApi";

export const UserUI = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.GET_COMPANY_EMPLOYERS],
    queryFn: () => clientApi.getAllClients(),
  });

  const handleRefetch = () => {
    refetch();
  };

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
              <UserList
                refetch={handleRefetch}
                isLoading={isLoading}
                employers={users || []}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
