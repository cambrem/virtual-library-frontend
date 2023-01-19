import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddBook() {

    let navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        dateFinished: "",
        rating: "",
        notes: ""
    })

    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');

    const handleYearChange = (event) => {
        setYear(event.target.value);
        console.log(year);
        console.log(book);
    }
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
        console.log(month);
        console.log(book);
    }
    const handleDayChange = (event) => {
        setDay(event.target.value);
        console.log(day);
        console.log(book);
    }
    
    const { title, author, genre, dateFinished, rating, notes } = book

    const onInputChange = (e) => {
        setBook(prevState => ({...prevState, [e.target.name]: e.target.value }));
        setBook(prevState => ({...prevState, dateFinished: `${month}/${day}/${year}` }));
        console.log(e.target.value);
        console.log(book);
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(year + '-' + month + '-' + day);
        console.log(book);
        await axios.post("http://localhost:8080/book", book);
        navigate("/");
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add Book to Library</h2>

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
                                <option value="" disabled selected>Select</option>
                                <option value={"Fiction"}>Fiction</option>
                                <option value={"Non-Fiction"}>Non-Fiction</option>
                            </select>

                        </div>
                        <div className='mb-3'>
                            <label htmlFor='dateFinished' className='form-label'>
                                Date Finished
                            </label>
                            <div className="form-group">
                                <select
                                    className='form-control'
                                    name='month'
                                    onChange={(e) => handleMonthChange(e)}>
                                    <option value="" disabled selected>Month</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                </select>
                                <select
                                    className='form-control'
                                    name='day'
                                    onChange={(e) => handleDayChange(e)}>
                                    <option value="" disabled selected>Day</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                </select>
                                <select
                                    className='form-control'
                                    name='dateFinished'
                                    onChange={(e) => handleYearChange(e)}>
                                    <option value="" disabled selected>Year</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                </select>
                            </div>
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
                                <option value="" disabled selected>Select</option>
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
