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

export function getInterviewersForDay(state, day) {
  const validDays = state.days.map(day => day.name);

  if (!day || !validDays.includes(day)) return [];
  return state.days
    .filter(interviewer => interviewer.name === day)[0]
    .interviewers.map(apptId => state.appointments[apptId]);
}

