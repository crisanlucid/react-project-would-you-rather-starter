export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function countObjects(object = {}) {
  return Object.values(object).length;
}

export function findTopUsersLeaderboard(users, limit = 3) {
  return Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: countObjects(user.answers),
      questionCount: user.questions.length,
      total: countObjects(user.answers) + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, limit);
}
export function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export const styles = {
  primary: {
    color: 'blue',
    bgColor: 'aliceblue',
  },
  secondary: {
    color: 'grey',
    bgColor: '#eee',
  },
  tint: {
    color: 'orange',
  },
  trophy: {
    color: ['yellow', 'grey', 'orange'],
  },
};
