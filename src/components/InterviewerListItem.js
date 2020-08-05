import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const classString = classNames('interviewers__item-image',{'interviewers__item--selected':props.selected});
  console.log(props)
        return (  
        <li 
        className={classString} onClick={props.setInterviewer} >
        <img
            className='interviewers__item-image'
            src={props.avatar}
            alt={props.name}
        />
        {props.selected && props.name}
        </li>
        );
}