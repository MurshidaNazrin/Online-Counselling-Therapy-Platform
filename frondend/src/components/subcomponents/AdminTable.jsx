import React from 'react'

function AdminTable({columns = [], data = [], actions = null}) {
  return (
    <div className='overflow-x-auto'>
        <table className='w-full text-left'>
            <thead className='bg-gray-50 text-sm text-gray-600'>
                <tr>
                    {columns.map((c) => <th key={c.key} className='p-2'>{c.title}</th>)}
                    {actions && <th className='p-2'>Actions</th>}
                </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
                {data.map((row) => (
                    <tr key={row.id} className='border-t hover:bg-gray-50'>
                        {columns.map((c) => <td key={c.key} className='p-2 align-top'>{c.render ? c.render(row) : row[c.key]}</td>)}
                        {actions && <td className="p-2">{actions(row)}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default AdminTable
