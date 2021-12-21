import React,{useState,useEffect} from 'react'
import {Footer} from './Footer'
import {AddURL} from './AddURL'
import './AddURL.css'
import './DetailsSpace.css';
import './Footer.css';

export const DetailsSpace = () => {
    // let initURLs;
    // if(localStorage.getItem("URLs")=== null){
    //     initURLs=[];
    // }
    // else {
    //     initURLs=JSON.parse(localStorage.getItem("URLs"));
    // }
    // const [URLs, setURLs] = useState([initURLs]);
    // useEffect(()=>{
    //     localStorage.setItem("urls",JSON.stringify(URLs));
    // },[URLs])
    // const addUrl=(ourl)=>{
    //     let sn;
    //     if(ourl.length==0){
    //         sn=0;
    //     }
    //     else{
    //         sn=ourl[ourl.length-1].sn+1;
    //     }
        
    //     const URLs={
    //         sn=sn,
    //         originalURL=originalURL,
    //         shortURL=shortURL,
    //         nClick=nClick
    //     }
    //     localStorage.setItem("urls",JSON.stringify(URLs));
    // }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                    <a className="navbar-brand text-xl" href="#"><span className='text-danger'>URLS</span>hort</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='profile-url-field-container'>
                <div class="left-container container">
                    <div className='left-content'>
                        <div className='profile-box'>
                            <div className='profile'>
                                <img src='https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRveXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60' alt='pic'/>
                            </div>
                            <div className='name'>Abhay Singh</div>
                        </div>
                        <div className='statistics'><p>Statistics</p></div>
                        <div className='button'><button className='btn btn-info p-1'>Sign out</button> </div>
                    </div>
                </div>
                <div className='right-container container'>
                    <h4>Shortify URL</h4>
                    <div className='url-field-container '>
                        <div class="url-input input-group mb-2">
                            <input type="text" class="form-control" placeholder="Original URL" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div class="create-btn d-grid gap-2 d-md-block mb-2">
                            <button class="btn btn-primary" type="button">Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='url-details-container '>
                <div className='heading'>
                    <div className='s-no title'>S.NO.</div>
                    <div className='o-url title'>ORIGINAL URL</div>
                    <div className='s-url title'>SHORT URL</div>
                    <div className='o-url title'>NO. OF CLICKS</div>
                </div>
                <div className='add-url'>
                    <AddURL  />
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}