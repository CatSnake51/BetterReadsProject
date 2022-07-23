import React from 'react';
import PropTypes from 'prop-types'

import './RevInputs.css'

/* 
Component for Review Inputs
There is a lot of things to fill out so I modularize it.
name is used in more than one place.
The extra split and join is to get rid of the - that some names have so I can use name to render in the page
Then name is assign to name and also concatinate with 'submit' to give it a specific id
The setFunc are the different functions to change the state when someone types in the input
value has the state each specific input changes
*/
const RevInputs = ({
  name,
  type,
  setFunc,
  value
}) => {
  return (
    <div>
    <label>
    {name.split('-').join(' ') + ' :'}
    </label>
      
      <input
        id={'submit' + name}
        name={name}
        type={type}
        onChange={setFunc}
        value={value}
        required
      />
      </div>
  );
};

RevInputs.propTypes = {
  /** Name of the input field */
  name: PropTypes.string.isRequired,
  /** Type of input field */
  type: PropTypes.string.isRequired,
  /** Function to run when the input is changed */
  setFunc: PropTypes.func,
  /** Current value of the input field */
  value: PropTypes.string.isRequired
}

export default RevInputs;
