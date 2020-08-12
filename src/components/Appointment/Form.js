import React, { useState } from 'react'
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  console.log('form props:' , props)
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  function reset() {
    setName('');
    setInterviewer(null);
  }

  const cancel = () => {
    reset()
    return props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  }

  const [error, setError] = useState("");


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            onSubmit={event => event.preventDefault()}
            data-testid="student-name-input"
            data-onSave={name}
          />
        </form>
      <section className="appointment__validation">{error}</section>
        <InterviewerList 
        interviewers={props.interviewers} 
        interviewer={interviewer} 
        onChange={(event) => setInterviewer(event)} />
        </section>
        <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
          
        </section>
      </section>
    </main>
  )
}