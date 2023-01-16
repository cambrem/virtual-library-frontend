import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditBook() {

    let navigate = useNavigate();

    const {id}=useParams();

    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        dateFinished: "",
        rating: "", 
        notes: ""
    })

    const { title, author, genre, dateFinished, rating, notes} = book

    const onInputChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        loadBook();
    },[])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/book/${id}`, book);
        navigate("/");
    }

    const loadBook =async ()=>{
        const result=await axios.get(`http://localhost:8080/book/${id}`)
        setBook(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Book</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='title' className='form-label'>
                                Title
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Enter book title'
                                name='title'
                                value={title}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='author' className='form-label'>
                                Author
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Enter book author'
                                name='author'
                                value={author}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='genre' className='form-label'>
                                Genre
                            </label>
                            <select
                                className='form-control'
                                name='genre'
                                value={genre}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value={""}>Select</option>
                                <option value={"Fiction"}>Fiction</option>
                                <option value={"Non-Fiction"}>Non-Fiction</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='dateFinished' className='form-label'>
                                Date Finished
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='mm/dd/yyyy'
                                name='dateFinished'
                                value={dateFinished}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='rating' className='form-label'>
                                Rating
                            </label>
                            <select
                                className='form-control'
                                name='rating'
                                value={rating}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value={""}>Select</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='notes' className='form-label'>
                                Notes
                            </label>
                            <textarea
                                className='form-control'
                                placeholder='Add notes about the book'
                                name='notes'
                                value={notes}
                                onChange={(e) => onInputChange(e)}
                                style={{ resize: 'none' }}
                                rows='3'
                                wrap='soft'
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>
                            Submit
                        </button>
                        <Link className='btn btn-outline-danger mx-2' to='/'>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
