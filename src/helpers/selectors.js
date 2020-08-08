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
  return interviewObj;
}

// Function to find available interviewers on the given day
export function getInterviewersForDay(state, day) {
  const validDay = state.days.find((days) => days.name === day);
  console.log('valid day:', validDay)

  if (!validDay) return [];

  console.log(state.interviewers.keys)
  const interviewers = [];
  for (const key in state.interviewers) {
    interviewers.push(state.interviewers[key]);
    console.log(key);
  }

  const availableInterviewers = validDay.interviewers.map((intId) => state.interviewers[intId]) 
  console.log('availableInterviewers', availableInterviewers);
  return availableInterviewers;

}

