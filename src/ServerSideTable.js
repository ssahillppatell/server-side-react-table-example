import { useQuery } from '@apollo/client'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'

import './ServerSideTable.css'
import { DOCTORS_COLUMNS } from './headers'
import { DOCTORS_QUERY } from './query'

const ServerSideTable = () => {
    const [doctors, setDoctors] = useState([])
    const [pagination, setPagination] = useState({
        index: 1,
        limit: 20,
    })

    const { data, loading, error, refetch } = useQuery(DOCTORS_QUERY, {
        variables: {
            limit: pagination.limit,
            index: pagination.index,
            sort: JSON.stringify({firstName: 1}),
            query: JSON.stringify({}),
        },
        onCompleted: data => {
            setDoctors(data.getDoctors.data)
        }
    })

    useEffect(() => {
        refetch({
            limit: pagination.limit,
            index: pagination.index,
        })
    }, [pagination, refetch])

    useEffect(() => {
        if (data) {
            setDoctors(data.getDoctors.data)
        }
    }, [data])

    const tableInstance = useReactTable({
        data: doctors,
        columns: DOCTORS_COLUMNS,
        getCoreRowModel: getCoreRowModel(),
    })

    const { getHeaderGroups, getRowModel } = tableInstance

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div>
            <table>
                <thead>
                    {getHeaderGroups().map((headerGroup, index) => (
                        <tr key={index}>
                            {headerGroup.headers.map((header, idx) => (
                                <th key={idx}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {getRowModel().rows.map((row, index) => (
                        <tr key={index}>
                            {row.getVisibleCells().map((cell, idx) => (
                                <td key={idx}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPagination({ ...pagination, index: pagination.index - 1 })}>
                    Previous
                </button>
                <button onClick={() => setPagination({ ...pagination, index: pagination.index + 1 })}>
                    Next
                </button>
            </div>
        </div>    
    )
}

export default ServerSideTable