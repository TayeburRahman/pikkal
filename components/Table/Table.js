import React /*useMemo, useState*/ from "react";
import { useTable, useSortBy, usePagination } from "react-table";
// import { CSVLink } from "react-csv";

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    rows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const isDataEmpty = rows.length === 0;

  return (
    <>
      <span className="block text-sm text-gray-700 w-full text-left max-w-[calc(100%-30px)] mx-auto md:max-w-full md:mx-0">
        Showing {page.length} of {rows.length} results
      </span>

      <div className="overflow-x-auto relative shadow-lg rounded-lg max-w-[calc(100%-30px)] mx-auto md:max-w-full md:mx-0 mt-2">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-700"
        >
          <thead className="text-xs text-gray-700 uppercase bg-slate-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`${headerGroup}`}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-3 px-6"
                  >
                    {column.render("Header")}
                    <span className="inline-block ml-2">
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {isDataEmpty ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 px-6 border-b border-slate-200"
                >
                  There are no more records, please check again.
                </td>
              </tr>
            ) : (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    key={`${row.id}`}
                    {...row.getRowProps()}
                    className="hover:bg-slate-50"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          key={`${row.id}`}
                          {...cell.getCellProps()}
                          className="py-4 px-6 border-b border-slate-200"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination flex items-center justify-between mt-[50px] text-gray-700 mb-24">
        <div className="flex items-center">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-1 mr-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-1 mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-1 mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-1 ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {">>"}
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-sm mr-2">
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{pageOptions.length}</strong>
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="outline-none border border-slate-300 rounded-md text-gray-700 bg-white py-1 px-2"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
