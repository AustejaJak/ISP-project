const stats = [
    { name: 'Pelnas', stat: '71,897' },
    { name: 'Vidutinė užsakymo kaina', stat: '20.25' },
    { name: 'Produktų kiekis', stat: '45' },
]

export default function Stats() {
    return (
        <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Paskutinės 30 dienų</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
