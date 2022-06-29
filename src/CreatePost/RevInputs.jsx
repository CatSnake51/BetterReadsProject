import React from 'React';
/* 
Component for Review Inputs
*/
const RevInputs = (props) => {
  return (
    <div>
      {props.name.split('-').join(' ') +' :'}<input 
      id={'submit' + props.name}
      name={props.name}
      type={props.type}
      onChange={props.setFunc}
      value={props.value}
      required
      />
      
    </div>
  )
}

export default RevInputs;