import { useQuery } from "@apollo/client";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

import "./ServerSideTable.css";
import { DOCTORS_COLUMNS } from "./headers";
import { DOCTORS_QUERY } from "./query";
import { Table } from "react-bootstrap";

const ServerSideTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({
    index: 1,
    limit: 10,
  });
  const [sort, setSort] = useState({});
  const [query, setQuery] = useState({});
  const [count, setCount] = useState(0);

  const { data, loading, error, refetch } = useQuery(DOCTORS_QUERY, {
    variables: {
      limit: pagination.limit,
      index: pagination.index,
      sort: JSON.stringify(sort),
      query: JSON.stringify(query),
    },
    onCompleted: (data) => {
      setDoctors(data.getDoctors.data);
      setCount(data.getDoctors.info.count);
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
      setCount(data.getDoctors.info.count);
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
    <div>
      <div className="table-container"
        style={{
          width: "100vw",
          overflowX: "auto",
          position: "relative",
          height: "calc(50vh - 100px)",
        }}
      >
        <Table
          striped bordered hover
          className="text-nowrap"
        >
          <thead className="table-header">
            {getHeaderGroups().map((headerGroup, index) => (
              <tr key={index}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    style={{
                      width: '10%',
                    }}
                    key={idx}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        <div
                          onClick={() => {
                            headerGroup.headers.forEach((h) => {
                              if (h.column.columnDef["sort"]) {
                                if(h.column.id !== header.column.id) {
                                  delete h.column.columnDef["sort"]
                                }
                              }
                            });
                            const tmpSort = {};
                            console.log(header.column.columnDef["sort"]);
                            if (header.column.columnDef["sort"]) {
                              tmpSort[header.id] =
                                header.column.columnDef["sort"] === 1 ? -1 : 1;
                              header.column.columnDef["sort"] === 1
                                ? (header.column.columnDef["sort"] = -1)
                                : (header.column.columnDef["sort"] = 1);
                            } else {
                              tmpSort[header.id] = 1;
                              header.column.columnDef["sort"] = 1;
                            }
                            setSort(tmpSort);
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.columnDef["sort"]
                            ? header.column.columnDef["sort"] === 1
                              ? " 🔼"
                              : " 🔽"
                            : null}
                        </div>
                        {header.column.columnDef.searchable ? (
                          header.column.columnDef.searchType === "dropdown" ? (
                            <select
                              onChange={(e) => {
                                const tmpQuery = {};
                                tmpQuery[header.id] = e.target.value;
                                setQuery(tmpQuery);
                              }}
                              defaultValue=""
                            >
                              <option value="" disabled>
                                -
                              </option>
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          ) : header.column.columnDef.searchType === "date" ? (
                            <div>
                              <input
                                type="date"
                                onChange={(e) => {
                                  const tmpQuery = {};
                                  tmpQuery[header.id] = e.target.value;
                                  setQuery(tmpQuery);
                                }}
                              />
                            </div>
                          ) : header.column.columnDef.searchType === "daterange" ? (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const tmpQuery = {};
                                tmpQuery[header.id] = {
                                  $gte: Date.parse(e.target.elements[0].value),
                                  $lte: Date.parse(e.target.elements[1].value),
                                };
                                setQuery(tmpQuery);
                              }}
                            >
                              <input
                                type="date"
                                placeholder="From"
                              />
                              <input
                                type="date"
                                placeholder="To"
                              />
                              <button type="submit">Submit</button>
                            </form>
                          ) : (
                            <div>
                              <input
                                type="text"
                                onKeyDown={(e) => {
                                  if(e.key === "Enter") {
                                    const tmpQuery = {};
                                    tmpQuery[header.id] = {
                                      $regex: "^" + e.target.value,
                                      $options: "i"
                                    };
                                    setQuery(tmpQuery);
                                  }
                                }}
                              />
                            </div>
                          )
                        ) : null}
                      </div>
                    )}
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
      </div>
      <div>
        <button
          disabled={pagination.index === 1}
          onClick={() =>
            setPagination({ ...pagination, index: pagination.index - 1 })
          }
        >
          Previous
        </button>
        {
          [pagination.index - 2, pagination.index - 1, pagination.index, pagination.index + 1, pagination.index + 2].map((i) => {
            if(i > 0) {
              return (
                <button
                  key={i}
                  onClick={() => setPagination({
                    index: i,
                    limit: pagination.limit
                  })}
                >
                  {i}
                </button>
              )
            } else {
              return null
            }
          })
        }
        <button
          onClick={() =>
            setPagination({ ...pagination, index: pagination.index + 1 })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServerSideTable;
