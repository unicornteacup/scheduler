import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT= "EDIT"

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    console.log('interview:', interview)
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch(error => console.log(error));    
  }

  function edit() {
    transition(EDIT)  
  }

  function remove() {
    transition(CONFIRM)
  }
   
  
  function confirm(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    console.log('interview:', interview)
    transition(DELETING)
    props
    .cancelInterview(props.id, interview)
    .then(() => {
      transition(EMPTY)
    })
    .catch(error => console.log(error));    
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            return transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit} onDelete={remove}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={event => back()}/>
      )}
      {mode === EDIT && (
        <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={event => back()}/>
      )}
      {mode === SAVING && (
      <Status message ={'Saving'}/>
      )}
      {mode === CONFIRM && (
        <Confirm
        onConfirm={confirm} onCancel={event => back()}
        />
      )}
      {mode === DELETING && (
      <Status message ={'Deleting'}/>
      )}
    </article>
  )
}

 