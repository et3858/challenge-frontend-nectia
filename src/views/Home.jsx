import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { UserContext } from "../contexts/UserContext";
import LoadingElement from "../components/LoadingElement";
import InputElement from "../components/InputElement";


// books-challenge-nectia
const MOCK_URL = "https://run.mocky.io/v3/13768651-741e-4d2a-9f5e-61f4282f7d3e";


const convertToHumanDate = (props) => (
    // From the UTC string format, extract only the day, month and year and concat them
    new Date(`${props.getValue()}T00:00:00`)
        .toUTCString()
        .split(" ")
        .splice(1, 3)
        .join(" ")
);


const PAGE_SIZES = [2, 5, 10];
const COLUMNS = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Author', accessorKey: 'author' },
    { header: 'Genre', accessorKey: 'genre' },
    {
        header: 'Publication date',
        accessorKey: 'publication_date',
        enableGlobalFilter: false,
        cell: convertToHumanDate,
    },
];


function Home() {
    const userDetails = useContext(UserContext);

    const [books, setBooks] = useState([]);
    const [loading,  setLoading] = useState(true);
    const [showBooks, setShowBooks] = useState(false);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: PAGE_SIZES[1] });
    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);


    const table = useReactTable({
        columns: COLUMNS,
        data: books,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
    });


    const handleEditClick = (e) => {
        // code
    };


    const handleDeleteClick = (e) => {
        const booksCopy = books.slice();
        const foundBookIndex = booksCopy.findIndex(book => book.id === e.id);

        if (foundBookIndex >= 0) {
            booksCopy.splice(foundBookIndex, 1);
            setBooks(booksCopy);
        }
    };


    useEffect(() => {
        const options = {
            headers: {
                "Authorization": `Bearer ${userDetails.token}`,
            },
        };

        fetch(MOCK_URL, options)
            .then(response => response.json())
            .then(data => {
                setBooks(data.books);
                setShowBooks(true);
            })
            .catch(response => {
                console.warn(response);
            })
            .finally(() => setLoading(false));
    }, []);


    const renderCellHeader = (header) => {
        return (
            <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="border-y border-slate-600 p-2"
            >
                {header.isPlaceholder ? null : (
                    <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}

                        {{ asc: '🔼', desc: '🔽' }[header.column.getIsSorted() ?? null]}
                    </div>
                )}
            </th>
        );
    };


    return (
        <>
            {loading ? <LoadingElement /> : null}

            {showBooks ?
                <>
                <div className="flex flex-row gap-4 items-center mb-2">
                    <div className="flex flex-row items-center gap-2 mb-2">
                        <button
                            type="button"
                            className="bg-gray-500 rounded-full flex-none"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >{'|<'}</button>
                        <button
                            type="button"
                            className="bg-gray-500 rounded-full flex-none"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >{'<'}</button>

                        <span>
                            Page&nbsp;
                            <strong>{table.getState().pagination.pageIndex + 1}</strong>&nbsp;
                            of&nbsp;
                            <strong>{table.getPageCount()}</strong>
                        </span>

                        <button
                            type="button"
                            className="bg-gray-500 rounded-full flex-none"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >{'>'}</button>
                        <button
                            type="button"
                            className="bg-gray-500 rounded-full flex-none"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >{'>|'}</button>
                    </div>

                    <div className="flex-none">
                        <select
                            className="border cursor-pointer rounded-xl w-full p-2 bg-gray-700 text-whote"
                            value={table.getState().pagination.pageSize}
                            onChange={e => table.setPageSize(Number(e.target.value))}
                        >
                            {PAGE_SIZES.map(pageSize => (
                                <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-2">
                    <InputElement
                        type='text'
                        value={filtering}
                        onChange={e => setFiltering(e.target.value)}
                        placeholder="Search by title, author or genre"
                    />
                </div>

                <table className="border-collapse border border-slate-500 border-spacing-2 text-left">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(renderCellHeader)}
                                <th className="border-y border-slate-600 p-2">Options</th>
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row, i) => (
                            <tr key={row.id} className={i % 2 === 0 ? 'bg-slate-600' : ''}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="border-y border-slate-600 p-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}

                                <td className="border-y border-slate-600 p-2">
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="bg-blue-400 text-white py-2"
                                            onClick={() => handleEditClick(row.original)}
                                        >Edit</button>

                                        <button
                                            type="button"
                                            className="bg-red-500 text-white py-2"
                                            onClick={() => handleDeleteClick(row.original)}
                                        >Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
            : null}
        </>
    );
}


export default Home;
