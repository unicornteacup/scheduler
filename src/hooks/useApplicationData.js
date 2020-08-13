import React, { useState, useEffect } from "react";

import axios from "axios";

//Function to run axios calls, book, edit or cancel an interview

export default function useApplicationData(initial){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data,
      appointments: all[1].data, interviewers: all[2].data}))
    });
  }, [])

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then ((res) => {
      const daysList = [];
      for (let day of state.days) {
        daysList.push(day);
        if (day.name === state.day) {
          daysList[daysList.indexOf(day)].spots -= 1;
        }
      } 

     
      return setState({...state, days: daysList, appointments});
      
    })
}

function editInterview(id, interview) {

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
  .then (res => {
    setState({...state, appointments});
    return res
  })
}

function cancelInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  .then ((res) => {
    const daysList = [];
    for (let day of state.days) {
      daysList.push(day);
      if (day.name === state.day) {
        daysList[daysList.indexOf(day)].spots += 1;
      }
    } 

    setState({...state, days: daysList});
    return setState({...state, appointments: appointments});
  })
  
}

  return {state, setDay, bookInterview, editInterview, cancelInterview};
  
};