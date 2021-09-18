import React from 'react';
import axios from '../../axios'; 

const serverLogout = async () => {
    await axios.get('/logout')
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err.response.data);
        });
}

const handleClick = async (props) => {
    await serverLogout();
    props.history.push('/login');
}

const Home = (props) => {
    return (
        <div>
            <h1>Welcome home</h1>
            <button onClick={() => handleClick(props)}>Logout</button>
        </div>
    );
}

export default Home;