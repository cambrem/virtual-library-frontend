import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewBook() {

    const [book,setBook]=useState({
        title:'',
        author:'',
        rating:'',
        notes:''
    })

    const {id}=useParams();

    useEffect(()=>{
        loadBook()
    },[])

    const loadBook=async ()=>{
        const result=await axios.get(`http://localhost:8080/book/${id}`)
        setBook(result.data)
    }
    return (

        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Book Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Title: </b>
                                    {book.title}
                                </li>
                                <li className='list-group-item'>
                                    <b>Author: </b>
                                    {book.author}
                                </li>
                                <li className='list-group-item'>
                                    <b>Rating: </b>
                                    {book.rating}
                                </li>
                                <li className='list-group-item'>
                                    <b>Notes: </b>
                                    {book.notes}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link
                        className='btn btn-primary my-2' to={'/'}>
                        Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
