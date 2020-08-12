import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useApplicationData from "hooks/useApplicationData";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT= "EDIT";
const ERROR_SAVE= "ERROR_SAVE";
const ERROR_DELETE= "ERROR_DELETE"

export default function Appointment(props) {

  // console.log('appointment interviewers props:', props.interviewers);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //function to save a newly created appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    // console.log('interview:', interview)
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));   
    
       
  }

  function edit() {
    transition(EDIT)  
  }

  function remove() {
    transition(CONFIRM)
  }
   
  
  function confirm(id) {

    transition(DELETING, true)
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));    
  }

  return (
    <article className="appointment" data-testid="appointment">
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

 