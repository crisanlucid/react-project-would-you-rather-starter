import { saveQuestion } from '../utils/api';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addAnswerToQuestion(authedUser, id, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authedUser,
    id,
    answer,
  };
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => dispatch(addQuestion(question)));
  };
}
