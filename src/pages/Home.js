import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Home() {

    const [library, setLibrary] = useState([]);

    useEffect(() => {
        loadLibrary();
    }, []);

    const loadLibrary = async () => {
        const result = await axios.get("http://localhost:8080/library");
        setLibrary(result.data);
    }

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8080/book/${id}`)
        loadLibrary()
    }

    let [sortBy, setSortBy] = useState('');

    const handleChange = (event) => {
        setSortBy(event.target.value);
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">
                                <label htmlFor='sortBy' className='form-label'>
                                    Sort By
                                </label>
                                <select
                                    className='form-control'
                                    name='sortBy'
                                    value={sortBy}
                                    onChange={handleChange}
                                >
                                    <option value={""} className="light-lettering">Select</option>
                                    <option value={'rating'}>Rating</option>
                                    <option value={'dateFinished'}>Date Finished</option>
                                    <option value={'genre'}>Genre</option>
                                </select>
                            </th>
                            <th scope="col">Author</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Date Finished</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            library
                                .sort((a, b) => {
                                    if (sortBy === 'genre') { return a.genre.localeCompare(b.genre) }
                                    else if (sortBy === 'dateFinished') { return new Date(a.dateFinished) - new Date(b.dateFinished) }
                                    else if (sortBy === 'rating') { return b.rating - a.rating }
                                })
                                .map((book, index) => (
                                    <tr key={book.id}>
                                        <th scope="row">{book.title}</th>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td>{book.dateFinished}</td>
                                        <td>{book.rating}</td>
                                        <td>
                                            <Link className="btn btn-secondary mx-2" to={`/viewbook/${book.id}`}>View</Link>
                                            <Link className="btn btn-outline-primary mx-2" to={`/editbook/${book.id}`}>Edit</Link>
                                            <button className="btn btn-tertiary mx-2" onClick={() => deleteBook(book.id)}>X</button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

