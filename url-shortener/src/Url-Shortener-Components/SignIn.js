import React from 'react'
import './SignIn.css';

export const SignIn = () => {
    return (
        <div>
          <div className="form">
            <form>
              <h2>Sign In</h2>
              <div className="input-box">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input type="email" name="email" placeholder="User@email" required/>
              </div>
              <div className="input-box">
                <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                <input type="password" name="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
              </div>
              <div className="input-box">
                <input type="submit" name="sign-in" value="Login"/>
              </div>
                  <a href="#" >Sign up</a>
                  <a href="#">Forget Password</a>
            </form>
          </div>
        </div>
    )
}
