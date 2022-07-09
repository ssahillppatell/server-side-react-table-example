import { useQuery } from '@apollo/client'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'

import { DOCTORS_COLUMNS } from './headers'
import { DOCTORS_QUERY } from './query'

const ServerSideTable = () => {
    const [doctors, setDoctors] = useState([])
    const { data, loading, error } = useQuery(DOCTORS_QUERY)

    useEffect(() => {
        if (data) {
            setDoctors(data.getDoctors.data)
        }
    }, [data])

    const tableInstance = useReactTable({
        data: doctors,
        columns: DOCTORS_COLUMNS,
        getCoreRowModel: getCoreRowModel()
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div>
            <table>
                <thead>
                    {tableInstance.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {tableInstance.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>    
    )
}

export default ServerSideTable