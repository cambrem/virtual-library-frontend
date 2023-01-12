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

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            library.map((book, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.rating}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/viewbook/${book.id}`}
                                        >
                                            View
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to={`/editbook/${book.id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button className='btn btn-danger mx-2'
                                            onClick={() => deleteBook(book.id)}
                                        >Delete</button>
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

