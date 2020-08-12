import React, { useState, useEffect } from "react";

import axios from "axios";

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
      // let [days, appointments] = all;
      // console.log(days);
      // console.log(appointments);
      // console.log(all[0]);
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
     console.log('bookinterview;', interview)
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
    .catch(err => {
      console.log(err)
    })
  // })
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
   console.log('bookinterview;', interview)
return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
  .then (res => {
    console.log("edit res:", res);
    setState({...state, appointments});
    return res
  })
  .catch(err => {
    console.log("edit err:", err)
  })
// })
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
  .catch(err => {
    console.log(err)
  })
}



  return {state, setDay, bookInterview, editInterview, cancelInterview};
  
};