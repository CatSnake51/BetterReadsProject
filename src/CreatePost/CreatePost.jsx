import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';

import RevInputs from '../RevInputs/RevInputs.jsx';
import './CreatePost.css'

const CreatePost = () => {


  /* USER STRETCH GOAL (add if we have the time)
  const [user, setUser] = useState(''); 
  <RevInputs name='User' type='text' setFunc={event => setUser(event.target.value)} value={user}/><br/>
  */

  const [enumTags, setEnumTags] = useState([])
  //The states that represent the different inputs for creating a review
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState('');
  const [plotline, setPlotline] = useState('');
  const [unpredictability, setUnpredictability] = useState('');
  const [pace, setPace] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [ending, setEnding] = useState('');
  const [overallEnjoyability, setOverallEnjoyability] = useState('');
  const [tags, setTags] = useState([]);

  //function invoke when the submit button is clicked
  const handleSubmit = async (event) => {
    try {
      const response = await axios.post('/api/reviews', {
        name: title,
        author: author,
        comments: comments,
        plotline: plotline,
        unpredictability: unpredictability,
        pace: pace,
        writing_style: writingStyle,
        ending: ending,
        overall: overallEnjoyability,
        tags: tags
      })

      if (response.status === 200) {
        //post request to add the newly created review to the database
        //post = response.data
        console.log(response);

        setTitle('');
        setAuthor('');
        setComments('');
        setPlotline('');
        setUnpredictability('');
        setPace('');
        setWritingStyle('');
        setEnding('');
        setOverallEnjoyability('');
        setTags('');
      }
    } catch (err) {
      console.log(err);
    }
    //prevents the default behaviour of the browser submitting the form so that we can handle things instead.
    event.preventDefault();
  }

  useEffect(() => {
    async function getTags() {
      const data = await axios.get('/api/tags')
      setEnumTags(data.data)
    }
    getTags()
  }, [])

  const onSelect = (selectedList, selectedItem) => {
    setTags([...tags, selectedItem.tag_id]);
  }


  //best practice is not to have an action="http://localhost:3000/"
  return (
    <div id="form-container">
    <h2 className='review-header'>Write Review</h2>
      <form onSubmit={handleSubmit} id="post-form">

        <RevInputs name='Title' type='text' setFunc={event => setTitle(event.target.value)} value={title} />
        <RevInputs name='Author' type='text' setFunc={event => setAuthor(event.target.value)} value={author} />
        <RevInputs name='Comments' type='text' setFunc={event => setComments(event.target.value)} value={comments} />
        
        <div className='ratings'> Ratings (1-10)</div>
        <RevInputs name='Plotline' type='number' setFunc={event => setPlotline(event.target.value)} value={plotline} />
        <RevInputs name='Unpredictability' type='number' setFunc={event => setUnpredictability(event.target.value)} value={unpredictability} />
        <RevInputs name='Pace' type='number' setFunc={event => setPace(event.target.value)} value={pace} />
        <RevInputs name='Writing-Style' type='number' setFunc={event => setWritingStyle(event.target.value)} value={writingStyle} />
        <RevInputs name='Ending' type='number' setFunc={event => setEnding(event.target.value)} value={ending} />
        <RevInputs name='Overall-Enjoyability' type='number' setFunc={event => setOverallEnjoyability(event.target.value)} value={overallEnjoyability} />
        <div className='tags'>Tags: 
        <Multiselect
          options={enumTags}
          onSelect={onSelect}
          displayValue='name'
          showCheckbox
          hideSelectedList
          style={{
            multiselectContainer: {
              display: 'block',
              outline: '1px solid black',
              background: 'white',
              borderRadius: '5px',
              marginBottom: '5px'
            },
            searchBox: {
              border: 'none',
              height: '30px'
            }
          }}
        />
        </div>

        <button className="button1" type="submit">Submit</button>
      </form>
    </div>
  )
}
export default CreatePost;