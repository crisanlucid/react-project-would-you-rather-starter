import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='question-wrapper center'>
        <nav className='nav nav--block'>
          <ul>
            <li>
              <button className='btn active'>Link 1</button>
            </li>
            <li>
              <button className='btn '>Link 2</button>
            </li>
          </ul>
        </nav>
        <ul className='question-list'>
          {this.props.questionIds.map((id) => (
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
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp,
    ),
  };
};

export default connect(mapStateToProps)(HomePage);
