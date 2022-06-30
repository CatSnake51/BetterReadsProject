import React, { useState, useEffect } from "react";
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
    {name: 'action', id: 'action'},
    {name: 'angst', id: 'angst'},
    {name: 'classics', id: 'classics'},
    {name: 'comics/Graphic Novels', id: 'comic'},
    {name: 'fantasy', id: 'fantasy'},
    {name: 'historical fiction', id: 'historical'},
    {name: 'horror', id: 'horror'},
    {name: 'mystery', id: 'mystery'},
    {name: 'nonfiction', id: 'nonfiction'},
    {name: 'romance', id: 'romance'},
    {name: 'science fiction', id: 'science fiction'},
    {name: 'fan', id: 'action'},
    {name: 'thrillers', id: 'thrillers'},
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
          options={options}
          onSelect={onSelect}
          displayValue="name"
        />
        {/*
        <label for="tags">Tags:</label>
        <select name="tags" id="submitTags" multiple onChange={handleChangeTags} value={tags}>
          <option value="action">Action/Adventure</option>
          <option value="angst">Angst</option>
          <option value="classics">Classics</option>
          <option value="comics">Comics/Graphic Novels</option>
          <option value="fantasy">Fantasy</option>
          <option value="historical-fiction">Historical Fiction</option>
          <option value="horror">Horror</option>
          <option value="mystery">Mystery</option>
          <option value="Nonfiction">Nonfiction</option>
          <option value="Romance">Romance</option>  
          <option value="ScieFi">Science Fiction</option>
          <option value="thrillers">Thriller</option>
        </select>
  */}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
  
/*
Past code
   <div id="form-container">
      <form onSubmit={handleSubmit} id="post-form">
        Name:<input 
          id="name"
          name="name"
          type="text"
          onChange={event => setName(event.target.value)}
          value={name}
          required
        /> <br/>
        Title:<input 
          id="title"
          name="title"
          type="text"
          onChange={event => setTitle(event.target.value)}
          value={title}
          required
        /><br/>
        Author: <input 
          id="author"
          name="author"
          type="text"
          onChange={event => setAuthor(event.target.value)}
          value={author}
          required
        /><br/>
        Comments: <input 
          id="caption"
          name="caption"
          type="text"
          onChange={event => setComments(event.target.value)}
          value={comments}
          required
        /><br/>
        <div className='ratings'> Ratings: <br/>
          Plotline: <input 
            id="plotline"
            name="plotline"
            type="number"
            onChange={event => setPlotline(event.target.value)}
            value={plotline}
            required
          /><br/>
          Unpredictability: <input 
            id="unpredictability"
            name="unpredictability"
            type="text"
            onChange={event => setUnpredictability(event.target.value)}
            value={unpredictability}
            required
          /> <br/>
          Pace: <input 
            id="pace"
            name="pace"
            type="number"
            onChange={event => setPace(event.target.value)}
            value={pace}
          /> <br/>
          Writing Style: <input 
            id="writing-style"
            name="writing-style"
            type="number"
            onChange={event => setWritingStyle(event.target.value)}
            value={writingStyle}
            required
          /> <br/>
          Ending: <input 
            id="ending"
            name="ending"
            type="number"
            onChange={event => setEnding(event.target.value)}
            value={ending}
            required
          /> <br/>
          Overall Enjoyability: <input 
            id="overall_enjoyability"
            name="overall_enjoyability"
            type="number"
            onChange={event => setOverallEnjoyability(event.target.value)}
            value={overallEnjoyability}
            required
          />
        </div>
        Tags:<input 
          id="tags"
          name="tag"
          type="text"
          onChange={event => setTags(event.target.value)}
          value={tags}
          placeholder="Separate tags with commas (i.e. fiction, romance, etc)"
          required
        /> <br/>
        <button type="submit">Submit form</button>
      </form>
    </div>

*/
export default CreatePost;