import React from 'react';
import PropTypes from 'prop-types'

//TODO: make sure that the value matches with data received from database
const Post = ({ post }) => {
  // console.log('POSTS', post);
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
        {/* <p>Tags: {post.tags.join(', ')}</p> */}
        <br />
      </div>
    </div>
  );
};

Post.propTypes = {
  /** Information about the post */
  post: PropTypes.shape({
    /** Name of book */
    name: PropTypes.string,
    /** Name of author */
    author: PropTypes.string,
    /** Comments about the book */
    comments: PropTypes.string,
    /** Rating 1-10 of the plotline */
    plotline: PropTypes.number,
    /** Rating 1-10 of the unpredicatability */
    unpredictability: PropTypes.number,
    /** Rating 1-10 of the pace */
    pace: PropTypes.number,
    /** Rating 1-10 of the writing style */
    writing_style: PropTypes.number,
    /** Rating 1-10 of the ending */
    ending: PropTypes.number,
    /** Overall rating of the book */
    overall: PropTypes.number,
  })
}

export default Post;
