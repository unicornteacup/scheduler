import React from "react";
import "components/InterviewerList.scss";
// import Classnames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
      <section className =''>
          <h4 className="interviewers__header text--light">{props.name}</h4>
          <ul className="interviewers__list">{interviewers}</ul>
          
      </section>
  )
}