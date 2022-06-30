import React, { useEffect, useState } from 'react';
import CreatePost from '../CreatePost/CreatePost.jsx';
import RenderFeed from '../RenderFeed/RenderFeed.jsx';
import axios from 'axios';
// import { async } from 'regenerator-runtime';

//write a function that takes an obj of post setData passing in the data object with current post obj
//pass to

const MainContainer = () => {
  const [data, setData] = useState([]);

  // const updateData = (post) => {
  //   setData(...data, post);
  // };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/reviews');
      console.log(result);
      console.log(result.data);
      setData(result.data);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setData(
      data.filter((post) => {
        return post.review_id !== id;
      })
    );
  };
  // console.log(data);
  return (
    <div id="main-container">
      <CreatePost />
      <RenderFeed posts={data} handleDelete={handleDelete} />
    </div>
  );
};
export default MainContainer;
