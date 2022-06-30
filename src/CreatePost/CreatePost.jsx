import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';
import RevInputs from './RevInputs.jsx';
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import Multiselect from 'multiselect-react-dropdown';


const CreatePost = () => {
  

  /* USER STRETCH GOAL (add if we have the time)
  const [user, setUser] = useState(''); 
  <RevInputs name='User' type='text' setFunc={event => setUser(event.target.value)} value={user}/><br/>
  */

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
  
/*
  const handleChangeTags = () => {
    var options = e.target.options;
    const arrayOfTags = [];
    options.forEach(option => {
      if(option.selected){
        arrayOfTags.push(option.value)
      }
    })
    useTags(arrayOfTags);
  }
*/
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
  
      if(response.status === 200){
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
    } catch(err) {
      console.log(err);
    }
    //prevents the default behaviour of the browser submitting the form so that we can handle things instead.
    event.preventDefault();
  }
  //options for the multiselect
  const options = [
    'action',
    'angst',
    'classics',
    'comics/graphic novels',
    'fantasy',
    'historical fiction',
    'horror',
    'mystery',
    'nonfiction',
    'romance',
   'science fiction',
    'fan',
    'thrillers'
  ]

  const onSelect = (selectedList, selectedItem)=> {
    setTags(selectedList);
  }


//best practice is not to have an action="http://localhost:3000/"
  return (
    <div id="form-container">
      <form onSubmit={handleSubmit} id="post-form">
        
        <RevInputs name='Title' type='text' setFunc={event => setTitle(event.target.value)} value={title}/><br/>
        <RevInputs name='Author' type='text' setFunc={event => setAuthor(event.target.value)} value={author}/><br/>
        <RevInputs name='Comments' type='text' setFunc={event => setComments(event.target.value)} value={comments}/><br/>
        
        <div className='ratings'> Ratings: <br/>
        <RevInputs name='Plotline' type='number' setFunc={event => setPlotline(event.target.value)} value={plotline}/><br/>
        <RevInputs name='Unpredictability' type='number' setFunc={event => setUnpredictability(event.target.value)} value={unpredictability}/><br/>
        <RevInputs name='Pace' type='number' setFunc={event => setPace(event.target.value)} value={pace}/><br/>
        <RevInputs name='Writing-Style' type='number' setFunc={event => setWritingStyle(event.target.value)} value={writingStyle}/><br/>
        <RevInputs name='ending' type='number' setFunc={event => setEnding(event.target.value)} value={ending}/><br/>
        <RevInputs name='Overall-Enjoyability' type='number' setFunc={event => setOverallEnjoyability(event.target.value)} value={overallEnjoyability}/><br/>

        <Multiselect 
          isObject={false}
          options={options}
          onSelect={onSelect}
        />
        
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
  
export default CreatePost;