const transactions = [
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
    {
        id: 'AAPS0L',
        name: 'vardenis',
        lastname: 'pavardenis',
        email: 'vardenis@gmail.com',
        phoneNumber: '+37091261684',
        commission: '+$4.37',
        price: '$3,509.00',
    },
]

export default function OrderList() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Užsakymo ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Vardas
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Pavardė
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        El. paštas
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Telefono nr.
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Mokesčiai
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Kaina
                                    </th>
                                    <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                            {transaction.id}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            {transaction.name}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            {transaction.lastname}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.email}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.phoneNumber}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.commission}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.price}</td>
                                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Peržiūrėti užsakymą<span className="sr-only">, {transaction.id}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}