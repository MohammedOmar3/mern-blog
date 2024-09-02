import { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [userInfo, setUserInfo]);

  function logout(){
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

    return(
      <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
          {username && (
            <>
            <span>Hello, {username}</span>
            <Link to="/create">Create new Post</Link>
            <a onClick={logout} href="/#">Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    );
}

//1:25:18 -- Profile not working, neither does redirect currently. 