import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USER';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addAnswerToUser(authedUser, id, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    id,
    answer,
  };
}

export function handleSaveQuestionAnswer(authedUser, id, answer) {
  return (dispatch) => {
    dispatch(addAnswerToUser(authedUser, id, answer));
    dispatch(addAnswerToQuestion(authedUser, id, answer));

    return saveQuestionAnswer(authedUser, id, answer).catch((e) => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
}
