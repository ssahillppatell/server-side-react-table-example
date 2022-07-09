import { useQuery } from '@apollo/client'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

import "./ServerSideTable.css";
import { DOCTORS_COLUMNS } from "./headers";
import { DOCTORS_QUERY } from "./query";

const ServerSideTable = () => {
    const [doctors, setDoctors] = useState([]);
    const [pagination, setPagination] = useState({
        index: 1,
        limit: 20,
    });
    const [sort, setSort] = useState({});
    const [query, setQuery] = useState({});

    const { data, loading, error, refetch } = useQuery(DOCTORS_QUERY, {
        variables: {
            limit: pagination.limit,
            index: pagination.index,
            sort: JSON.stringify(sort),
            query: JSON.stringify(query),
        },
        onCompleted: (data) => {
            setDoctors(data.getDoctors.data);
        },
    });

    useEffect(() => {
        refetch({
            limit: pagination.limit,
            index: pagination.index,
            sort: JSON.stringify(sort),
            query: JSON.stringify(query),
        });
    }, [refetch, pagination, sort, query]);

    useEffect(() => {
        if (data) {
            setDoctors(data.getDoctors.data);
        }
    }, [data]);

    const tableInstance = useReactTable({
        data: doctors,
        columns: DOCTORS_COLUMNS,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const { getHeaderGroups, getRowModel } = tableInstance;

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
        <div className="container  " >
            <h1 className="" >ServerSideTable</h1>
            <Table hover className="text-nowrap" >
                <thead >
                    {getHeaderGroups().map((headerGroup, index) => (
                        <tr key={index}>
                            {headerGroup.headers.map((header, idx) => (
                                <th
                                    key={idx}
                                    className="bg-white  "
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : (
                                            <div className="" >
                                                <div
                                                    onClick={() => {
                                                        // headerGroup.headers.forEach(h => {
                                                        //     if(h.column.columnDef["sort"]) {
                                                        //         h.column.columnDef["sort"] = false
                                                        //     }
                                                        // })
                                                        const tmpSort = {}
                                                        console.log(header.column.columnDef["sort"]);
                                                        if (header.column.columnDef["sort"]) {
                                                            tmpSort[header.id] = header.column.columnDef["sort"] === 1 ? -1 : 1
                                                            header.column.columnDef["sort"] === 1 ? header.column.columnDef["sort"] = -1 : header.column.columnDef["sort"] = 1
                                                        } else {
                                                            tmpSort[header.id] = 1
                                                            header.column.columnDef["sort"] = 1
                                                        }
                                                        setSort(tmpSort)
                                                    }}
                                                >
                                                    {
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                    }
                                                    {
                                                        header.column.columnDef["sort"] ? (header.column.columnDef["sort"] === 1 ? ' 🔼' : ' 🔽') : null
                                                    }
                                                </div>
                                                {
                                                    header.column.columnDef.searchable ?
                                                        header.column.columnDef.searchType === 'dropdown' ? (
                                                            <select
                                                                onChange={e => {
                                                                    const tmpQuery = {}
                                                                    tmpQuery[header.id] = e.target.value
                                                                    setQuery(tmpQuery)
                                                                }}
                                                            >
                                                                <option value="" disabled>-</option>
                                                                <option value="true">true</option>
                                                                <option value="false">false</option>
                                                            </select>
                                                        ) : (
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => {
                                                                        const tmpQuery = {}
                                                                        tmpQuery[header.id] = e.target.value
                                                                        setQuery(tmpQuery)
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : null
                                                }
                                            </div>
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
            </Table>
            <div>
                <button className="btn btn-primary mr-2" onClick={() => setPagination({ ...pagination, index: pagination.index - 1 })}>
                    Previous
                </button>
                <button className="btn btn-primary m-2" onClick={() => setPagination({ ...pagination, index: pagination.index + 1 })}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default ServerSideTable;
