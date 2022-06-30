import React from 'react';
/* 
Component for Review Inputs
There is a lot of things to fill out so I modularize it.
Prop.name is used in more than one place.
The extra split and join is to get rid of the - that some names have so I can use props.name to render in the page
Then props.name is assign to name and also concatinate with 'submit' to give it a specific id
The props.setFunc are the different functions to change the state when someone types in the input
value has the state each specific input changes

*/
const RevInputs = (props) => {
  return (
    <label>
      {props.name.split('-').join(' ') +' :'}<input 
      id={'submit' + props.name}
      name={props.name}
      type={props.type}
      onChange={props.setFunc}
      value={props.value}
      required
      />
      
    </label>
  )
}

export default RevInputs;