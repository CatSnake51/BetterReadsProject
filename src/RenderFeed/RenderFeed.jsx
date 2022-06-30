import React from 'react';
import './RenderFeed.css'
import PropTypes from 'prop-types';
import Post from '../Post/Post.jsx';

//REMINDER:  -> make GET request in MainContainer and pass data as props to here
//TODO: Delete test data and if data isn't in an array, store it in one to iterate over and pass as prop to Posts component
const RenderFeed = ({ posts, handleDelete }) => {
  // console.log(posts);
  const postArr = [];
  posts.forEach((post, i) => {
    postArr.push(
      <Post post={post} key={post.review_id} handleDelete={handleDelete} />
    );
  });

  return <div className="post-container">{postArr}</div>;
};

RenderFeed.propTypes = {
  /** Array of post objects to be rendered */
  posts: PropTypes.array,
};

RenderFeed.defaultProps = {
  posts: [],
};

export default RenderFeed;
