// Function to find available appointments on the given day
export function getAppointmentsForDay(state, day) {
  const validDays = state.days.map(day => day.name);

  if (!day || !validDays.includes(day)) return [];
  return state.days
    .filter(appointment => appointment.name === day)[0]
    .appointments.map(apptId => state.appointments[apptId]);
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewObj = {
    student: interview.student
  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  console.log('interview:', interview)
  console.log('state:', state)
  console.log('interviewObj:', interviewObj)
  return interviewObj;
}

// Function to find available interviewers on the given day
export function getInterviewersForDay(state, day) {
  const validDay = state.days.find((days) => days.name === day);

  if (!validDay) {
    return [];
  }

  const interviewers = [];
  for (const key in state.interviewers) {
    interviewers.push(state.interviewers[key]);
  }

  const availableInterviewers = validDay.interviewers.map((intId) => state.interviewers[intId]) 
  return availableInterviewers;

}

