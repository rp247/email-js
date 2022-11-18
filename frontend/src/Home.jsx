import React from 'react';

/**
 * @return {object} JSX Table
 */
function Home() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return (
    <div>
      <h3> Hello {user.email} </h3>
    </div>
  );
}

export default Home;
