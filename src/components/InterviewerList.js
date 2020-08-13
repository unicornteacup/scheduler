import React from "react";
import "components/InterviewerList.scss";
// import Classnames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

// Function to display the list of interviewers 

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={(event) => props.onChange(interviewer.id)}
      />
    );
  });

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  return (
      <section className =''>
          <h4 className="interviewers__header text--light">Interviewer</h4>
          <ul className="interviewers__list">{interviewers}</ul>
          
      </section>
  )
}