import axios from 'axios';
import React from 'react';

//TODO: make sure that the value matches with data received from database
const Posts = ({ post, handleDelete }) => {
  // console.log('POSTS', post);
  const handleSubmit = async () => {
    try {
      const result = await axios.delete(`/api/reviews/${post.review_id}`);
      handleDelete(post.review_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="render-feed">
      <div id="post">
        <br />
        <p>Title: {post.name}</p> <br />
        <p>Author: {post.author}</p> <br />
        <p>Comments: {post.comments}</p> <br />
        <h3>REVIEW:</h3>
        <ul id="ratings">
          <li>Plotline: {post.plotline}</li>
          <li>Unpredictability: {post.unpredictability}</li>
          <li>Pace: {post.pace}</li>
          <li>Writing Style: {post.writing_style}</li>
          <li>Ending: {post.ending}</li>
          <li>Overall: {post.overall}</li>
        </ul>
        {post.tags ? (
          <p>Tags: {post.tags.split(',').join(', ')}</p>
        ) : (
          <p>Tags:</p>
        )}
        <button className="button1" onClick={handleSubmit}>
          Delete
        </button>
        <br />
      </div>
    </div>
  );
};

export default Posts;