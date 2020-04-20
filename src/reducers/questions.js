import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      const { question } = action;
      let optionOneVotes = {};
      let optionTwoVotes = {};

      if (question.optionOne.votes.length > 0) {
        optionOneVotes = {
          ...state[question.id].optionOne,
          votes: state[question.id].optionOne.votes.concat([question.id]),
        };
      }
      if (question.optionTwo.votes.length > 0) {
        optionTwoVotes = {
          ...state[question.id].optionTwo,
          votes: state[question.id].optionTwo.votes.concat([question.id]),
        };
      }

      console.log(optionOneVotes, optionTwoVotes);
      return {
        ...state,
        [question.id]: question,
        ...optionOneVotes,
        ...optionTwoVotes,
      };
    default:
      return state;
  }
}
