import { t } from "i18next";
import { Employer } from "../../types/types";
import { Loader } from "../Loader/Loader";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { userApi } from "../../clients/api/backoffice/userApi";
import { useSnackbarContext } from "../../context/snackbarContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface UserListProps {
  employers: Employer[];
  isLoading: boolean;
  refetch: () => void;
}

const getGender = (genderNumber: number) => {
  if (genderNumber === 0) return "Vyras";
  if (genderNumber === 1) return "Moteris";
  if (genderNumber === 2) return "Kita";
};

export const UserList: React.FC<UserListProps> = ({
  employers,
  isLoading,
  refetch,
}) => {
  const { setMessage } = useSnackbarContext();
  const deleteUser = useMutation({
    mutationKey: [QueryKey.DELETE_USER],
    mutationFn: userApi.deleteUser,
  });

  const handleEmployeeDeletion = (id: string) => {
    deleteUser.mutate(
      {
        userId: id,
      },
      {
        onSuccess: () => {
          setMessage("Darbuotojas ištrintas sėkmingai!");
          refetch();
        },
        onError: () => {
          setMessage("Įvyko klaida, bandykite dar kartą.");
        },
      }
    );
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>
            {t("BackofficeEmployersPage.WebsiteEmployersHeader")}
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            {t("BackofficeEmployersPage.WebsiteEmployersDescription")}
          </p>
        </div>
      </div>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle'>
            <div className='shadow-sm ring-1 ring-black ring-opacity-5'>
              {!isLoading && employers.length > 0 ? (
                <table
                  className='min-w-full border-separate'
                  style={{ borderSpacing: 0 }}
                >
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
                      >
                        {t("BackofficeEmployersPage.TableHeader.Name")}
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell'
                      >
                        {t("BackofficeEmployersPage.TableHeader.Position")}
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell'
                      >
                        {t("BackofficeEmployersPage.TableHeader.Gender")}
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell'
                      >
                        {t("BackofficeEmployersPage.TableHeader.Email")}
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'
                      >
                        {t("BackofficeEmployersPage.TableHeader.Role")}
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8'
                      >
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white'>
                    {employers.map((person, personIdx) => (
                      <tr key={person.email}>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {person.name}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                          )}
                        >
                          {person.jobPosition}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                          )}
                        >
                          {getGender(person.gender)}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                          )}
                        >
                          {person.email}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          )}
                        >
                          Darbuotojas
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                          )}
                        >
                          <button
                            onClick={() => handleEmployeeDeletion(person.id)}
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className='flex w-full justify-center items-center'>
                  <Loader isLoading={isLoading} />
                  {!isLoading && employers.length === 0 && (
                    <p className='my-3'>{t("Errors.EmptyArray")}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
