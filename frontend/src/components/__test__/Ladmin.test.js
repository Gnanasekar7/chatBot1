import React from 'react';
import { render, fireEvent, getAllByRole, queryAllByRole } from '@testing-library/react';
import axios from 'axios';
import Ladmin from '../Ladmin';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('Ladmin component', () => {
  test('should add an initial question', () => {
    const { getByText, getAllByRole } = render(<Ladmin />);
    const addInitialButton = getByText('Add initial question');
    fireEvent.click(addInitialButton);
    const initialQuestion = getAllByRole('textbox')[0];
    expect(initialQuestion).toBeInTheDocument();
  });

  test('should add a follow-up question', () => {
    const { getByText, getAllByRole } = render(<Ladmin />);
    const addInitialButton = getByText('Add initial question');
    fireEvent.click(addInitialButton);
    const addFollowUpButton = getAllByRole('button', { name: 'Add' })[0];
    fireEvent.click(addFollowUpButton);
    const followUpQuestion = getAllByRole('textbox')[1];
    expect(followUpQuestion).toBeInTheDocument();
  });

  test('should add a sub question', () => {
    const { getByText, getAllByRole } = render(<Ladmin />);
    const addInitialButton = getByText('Add initial question');
    fireEvent.click(addInitialButton);
    const addFollowUpButton = getAllByRole('button', { name: 'Add' })[0];
    fireEvent.click(addFollowUpButton);
    const addSubButton = getAllByRole('button', { name: 'Add' })[1];
    fireEvent.click(addSubButton);
    const subQuestion = getAllByRole('textbox')[2];
    expect(subQuestion).toBeInTheDocument();
  });

  test('should update the initial question', () => {
    const { getByText, getAllByRole } = render(<Ladmin />);
    const addInitialButton = getByText('Add initial question');
    fireEvent.click(addInitialButton);
    const initialQuestion = getAllByRole('textbox')[0];
    fireEvent.change(initialQuestion, { target: { value: 'Updated Initial Question' } });
    expect(initialQuestion.value).toBe('Updated Initial Question');
  });

  test('should update the follow-up question', () => {
    const { getByText, getAllByRole } = render(<Ladmin />);
    const addInitialButton = getByText('Add initial question');
    fireEvent.click(addInitialButton);
    const addFollowUpButton = getAllByRole('button', { name: 'Add' })[0];
    fireEvent.click(addFollowUpButton);
    const followUpQuestion = getAllByRole('textbox')[1];
    fireEvent.change(followUpQuestion, { target: { value: 'Updated Follow-up Question' } });
    expect(followUpQuestion.value).toBe('Updated Follow-up Question');
  });

  test('should handle save successfully', async () => {
    axios.post.mockResolvedValue({ status: 200 });
    const { getByText } = render(<Ladmin />);
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    expect(axios.post).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/Adminstore',
      expect.any(Array)
    );
  });
});
 