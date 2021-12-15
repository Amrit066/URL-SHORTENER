import React from 'react'
import './Section.css';
import {ShortUrlDetails} from './ShortUrlDetails'

export const Section = () => {
    return (
        <div>
                <div className='url-field-wrapper '>
                <div className='top-container mt-3'>
                <h3>
                    Worried about long <span className='text-danger'>URLs</span>.
                    Get small <span className='text-success'>URLs</span> here
                </h3>
                    <div className='url-field-container '>
                        <div class="url-input input-group mb-2">
                            <input type="text" class="form-control" placeholder="Original URL" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div class="create-btn d-grid gap-2 d-md-block mb-2">
                            <button class="btn btn-primary" type="button">Create</button>
                        </div>
                    </div>
                </div>
                <ShortUrlDetails />
            </div>
            <div className='info-section'>
                <div className='left-content'>
                    <p>Get  details about your <span className='text-success'>URLs</span><br/>
                        That also in a customized manner <br/>Sign up yourself and 
                        get all the statistics related to your <span className='text-success'>URLs</span>
                    </p>
                </div>
                <div className='right-content'>
                    <img src='https://images.unsplash.com/photo-1631260858690-c8ad08d16bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'></img>
                </div>
            </div>
        </div>
    )
}
