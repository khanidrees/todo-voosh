import React from 'react'

export const TasksListing = () => {
    // const url;
    // const {data, error, isLoading} = useFetch(url);
    
    const data = [
        {
            title:'grocery',
            description: 'alu bhindi etc',
            status: 'todo'
        },
        {
            title:'gym',
            description: 'half hour gym dfksjdfk d kdjkd',
            status: 'todo'
        },
    ];
  return (
    <div
    className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border mt-4">
        <table className="w-full text-left table-auto min-w-max">
            <thead>
            <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Title
                </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Desription
                </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Status
                </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                </th>
            </tr>
            </thead>
            <tbody>
            { Array.isArray(data) && data.length>0 && data.map(task=>{
                return(
                <tr>
                    <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                       {task.title}
                    </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {task.description}
                    </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {task.status}
                    </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                    <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        Edit
                    </a>
                    <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        Delete
                    </a>
                    </td>
                </tr>
                );
            })

            }
            
            </tbody>
        </table>
    </div>
  )
}
