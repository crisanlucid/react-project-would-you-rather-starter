import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='question-wrapper center'>
        <nav className='nav nav--block'>
          <ul>
            <li>
              <button className='btn active'>unanswered 1</button>
            </li>
            <li>
              <button className='btn '>answered 2</button>
            </li>
          </ul>
        </nav>
        <ul className='question-list'>
          {this.props.answered.map((id) => (
            <li key={id}>
              <div>Question ID: {id}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => {
  const answered = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp,
  );
  const unanswered = [];
  return {
    answered,
    unanswered,
  };
};

export default connect(mapStateToProps)(Dashboard);
