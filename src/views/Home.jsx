import React, { useEffect, useState } from "react";


// books-challenge-nectia
const MOCK_URL = "https://run.mocky.io/v3/c4498f84-2ef6-4a34-b456-1e7333e0eba0";


function Home() {
    const [books, setBooks] = useState([]);


    const handleEditClick = (e) => {
        // code
    };


    const handleDeleteClick = (e) => {
        // code
    };


    useEffect(() => {
        fetch(MOCK_URL)
            .then(response => response.json())
            .then(data => {
                setBooks(data.books)
            })
            .catch(response => {
                console.warn(response);
            });
    }, []);


    return (
        <>
            <table className="border-collapse border border-slate-500 border-spacing-2 text-left">
                <thead>
                    <tr>
                        <th className="border-y border-slate-600 p-2">Title</th>
                        <th className="border-y border-slate-600 p-2">Author</th>
                        <th className="border-y border-slate-600 p-2">Genre</th>
                        <th className="border-y border-slate-600 p-2">Publication date</th>
                        <th className="border-y border-slate-600 p-2">Options</th>
                    </tr>
                </thead>

                <tbody>
                    {books.map((e, i) => (
                        <tr key={e.id} className={i % 2 === 0 ? 'bg-slate-800' : ''}>
                            <td className="border-y border-slate-600 p-2">{e.title}</td>
                            <td className="border-y border-slate-600 p-2">{e.author}</td>
                            <td className="border-y border-slate-600 p-2">{e.genre}</td>
                            <td className="border-y border-slate-600 p-2">{e.publication_date}</td>
                            <td className="border-y border-slate-600 p-2">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="bg-blue-400 text-white"
                                        onClick={() => handleEditClick(e)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="bg-red-500 text-white"
                                        onClick={() => handleDeleteClick(e)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}


export default Home;
