import { t } from "i18next";
import { User } from "../../types/types";
import { Loader } from "../Loader/Loader";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { userApi } from "../../clients/api/backoffice/userApi";
import { useSnackbarContext } from "../../context/snackbarContext";
import { useState } from "react";
import { BaseSelect } from "../base-select/BaseSelect";
import { MenuItem, Select } from "@mui/material";
import { adminApi } from "../../clients/api/backoffice/adminApi";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface UserListProps {
  employers: User[];
  isLoading: boolean;
  refetch: () => void;
}

const getGender = (genderNumber: number) => {
  if (genderNumber === 0) return "Vyras";
  if (genderNumber === 1) return "Moteris";
  if (genderNumber === 2) return "Kita";
};

const roles = [
  {
    name: "Shop-Employee",
    id: "Shop-Employee",
  },
  {
    name: "Client",
    id: "Client",
  },
];

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

  const [selectedUserId, setSelectedUserId] = useState<undefined | string>(
    undefined
  );

  const handleUserChangeRole = (id: string) => {
    setSelectedUserId(id);
  };

  const changeUserRole = useMutation({
    mutationKey: [QueryKey.CHANGE_USER_ROLE],
    mutationFn: adminApi.changeUserRole,
  });

  const handleRoleChange = (e: any) => {
    const { value } = e.target;
    changeUserRole.mutate(
      {
        userData: { userId: selectedUserId, roles: [value] },
      },
      {
        onSuccess: () => {
          setMessage("Rolė pakeista sėkmingai.");
          refetch();
        },
        onError: () => {
          setMessage("Įvyko klaida. Bandykite dar kartą");
        },
      }
    );
  };

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
                      <tr key={person.user.email}>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {person.user.name}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                          )}
                        >
                          {person.user.jobPosition}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                          )}
                        >
                          {getGender(person.user.gender)}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                          )}
                        >
                          {person.user.email}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          )}
                        >
                          {person.roles[0]}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== employers.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                          )}
                        >
                          <div className='flex gap-3'>
                            <button
                              onClick={() =>
                                handleEmployeeDeletion(person.user.id)
                              }
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Panaikinti
                            </button>
                            <button
                              onClick={() =>
                                handleUserChangeRole(person.user.id)
                              }
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Pakeisti rolę
                            </button>
                            {selectedUserId === person.user.id && (
                              <Select
                                onChange={(e) => handleRoleChange(e)}
                                value={person.roles[0]}
                              >
                                {roles?.map(({ name, id }) => (
                                  <MenuItem key={id} value={id}>
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          </div>
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
