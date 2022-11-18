import React from 'react';
import {Navigate} from 'react-router-dom';


const fetchEmails = (setEmails, setError) => {
  const item = sessionStorage.getItem('user');
  if (!item) {
    setError('Logged out');
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  console.log('reqqing');
  fetch('http://localhost:3010/v0/mail', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) throw response;
      return response;
    })
    .then((json) => {
      setEmails(json);
      console.log('good');
    })
    .catch((error) => {
      setEmails([]);
      setError(`${error.status} - ${error.statusText}`);
    });
};

/**
 * @return {object} JSX Table
 */
function Home() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [emails, setEmails] = React.useState([]);
  const [name, setName] = React.useState(user ? user.name : '');
  const [error, setError] = React.useState('');

  const logout = () => {
    sessionStorage.removeItem('user');
    setEmails([]);
    setName('');
    setError('Logged Out');
  };

  React.useEffect(() => {
    fetchEmails(setEmails, setError);
  }, []);

  return (
    <div>
      {
        error !== '' ? <Navigate to="/login" /> :
          <h3> Hello {user ? user.name : ''} </h3>
      }
      <button disabled={!name} onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
