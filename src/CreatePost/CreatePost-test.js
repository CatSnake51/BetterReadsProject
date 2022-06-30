import React from 'React';
import { unmountComponentAtNode } from "react-dom";
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';

import CreatePost from './CreatePost.jsx';
import RevInputs from './RevInputs.jsx';

describe('Testing component CreatePost', () => {

  //render the compoenent to test it
  beforeAll(() => {
    const create = render(<CreatePost /*{...props}*/ />)
    //set some test props?
    
  }); 


  test('input box should reset to back after clicking submit', () => {
    //input text
    userEvent.type(screen.ByTestId('submitUser'), 'test');
    userEvent.type(screen.ByTestId('submitTitle'), 'test');
    userEvent.type(screen.ByTestId('submitAuthor'), 'test');
    userEvent.type(screen.ByTestId('submitComment'), 'test');
    //input number
    userEvent.type(screen.ByTestId('submitPlotline'), 'test');
    userEvent.type(screen.ByTestId('SubmitUnpredictability'), '1');
    userEvent.type(screen.ByTestId('SubmitPace'), '1');
    userEvent.type(screen.ByTestId('SubmitWritingStyle'), '1');
    userEvent.type(screen.ByTestId('SubmitEnding'), '1');
    userEvent.type(screen.ByTestId('SubmitOverallEnjoyability'), '1');

    userEvent.click(screen.getByText('Submit'))

    expect(screen.findAllBy('textbox')).toHaveValue('');

  })

  test('test that post request is sending the right info', async () => {

  })

});



