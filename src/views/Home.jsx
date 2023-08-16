import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";


// books-challenge-nectia
const MOCK_URL = "https://run.mocky.io/v3/13768651-741e-4d2a-9f5e-61f4282f7d3e";


function Home() {
    const userDetails = useContext(UserContext);
    const [books, setBooks] = useState([]);


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


    const convertToHumanDate = (date) => (
        // From the UTC string format, extract only the day, month and year and concat them
        new Date(`${date}T00:00:00`)
            .toUTCString()
            .split(" ")
            .splice(1, 3)
            .join(" ")
    );


    useEffect(() => {
        const options = {
            headers: {
                "Authorization": `Bearer ${userDetails.token}`,
            },
        };

        fetch(MOCK_URL, options)
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
                            <td className="border-y border-slate-600 p-2">{convertToHumanDate(e.publication_date)}</td>
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
