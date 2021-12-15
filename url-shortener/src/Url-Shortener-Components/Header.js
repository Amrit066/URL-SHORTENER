import React from 'react'

export const Header = () => {
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
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            </ul>
            <button type="button" class="btn btn-info ">Sign in</button>
        </div>
      </div>
    </nav>
    </div>
  )
}

