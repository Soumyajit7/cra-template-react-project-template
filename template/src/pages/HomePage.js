import React from 'react';
import Navbar from '../reusable_component/Navbar';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.userData);
  console.log(user)

  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
