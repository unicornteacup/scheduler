
import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/Index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "10am",
//     interview: {
//       student: "Bob Bobertson",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Jennifer Blueberry",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "9am",
//     interview: {
//       student: "Harry Potter",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   }
// ];

export default function Application(props) {
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

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

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
      .then (res => {
        setState({...state, appointments});
        return res
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
      setState({...state, appointments});
      return res
    })
    .catch(err => {
      console.log(err)
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
    .then (res => {
      setState({...state, appointments});
      return res
    })
    .catch(err => {
      console.log(err)
    })
  }

    

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview= {bookInterview}
        cancelInterview= {cancelInterview}
        editInterview= {editInterview}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList 
              days={state.days} 
              day={state.day} 
              setDay={setDay} />
            </nav>
          <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" bookInterview={bookInterview}/>
      </section>
    </main>
  )
};
