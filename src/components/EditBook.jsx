import React from "react";
import DialogElement from "./DialogElement";
import InputElement from "./InputElement";


function EditBook({
    isOpen,
    handleSave,
    handleClose,
    data,
    setData,
}) {
    const handleClick = (event) => {
        event.preventDefault();
        handleSave();
    };


    return (
        <DialogElement
            title="Edit book"
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <form className="flex flex-col gap-4 my-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="titleField">Title</label>

                    <InputElement
                        type='text'
                        id='titleField'
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        placeholder="Title"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="authorField">Author</label>

                    <InputElement
                        type='text'
                        id='authorField'
                        value={data.author}
                        onChange={(e) => setData({ ...data, author: e.target.value })}
                        placeholder="Author"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="genreField">Genre</label>

                    <InputElement
                        type='text'
                        id='genreField'
                        value={data.genre}
                        onChange={(e) => setData({ ...data, genre: e.target.value })}
                        placeholder="Genre"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="publicationDateField">Publication date</label>

                    <InputElement
                        type='date'
                        id='publicationDateField'
                        value={data.publication_date}
                        onChange={(e) => setData({ ...data, publication_date: e.target.value })}
                        placeholder="Publication date"
                    />
                </div>


                <button
                    type="submit"
                    className="bg-green-500 text-white rounded-xl"
                    onClick={handleClick}
                >Save</button>
            </form>
        </DialogElement>
    );
}


export default EditBook;
