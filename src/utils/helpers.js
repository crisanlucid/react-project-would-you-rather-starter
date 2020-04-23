export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
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
};
