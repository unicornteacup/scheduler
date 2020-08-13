# Interview Scheduler

## Project Description

Interview Scheduler is a SPA (Single Page Application) built using react which allows users to add, edit and delete interview appointments. 

Data is persisted by the API server using a PostgreSQL database. 

The client application communicates with an API server over HTTP, using the JSON format. 

Tests are performed using Jest for component integration testing and Cypress for End to End testing.

## Project Features

* Interviews can be booked between Monday and Friday.

* A user can book an interview in an empty appointment slot.

* A user can cancel an existing interview.

* A user can edit the details of an existing interview.

* A user is presented with a confirmation when they attempt to cancel an interview.

* A user is shown an error if an interview cannot be saved or deleted.

* A user is shown a status indicator while asynchronous operations are in progress.

## Project Stack

Front-End: React, Axios, JSX, HTML, SASS, JavaScript

Back-End: Express, Node.js, PostgreSQL

Testing: Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

### Main Appointment View
!['Main Appointment View'](https://github.com/unicornteacup/scheduler/blob/master/docs/Main%20Appointment%20View.png?raw=true)

### Add New Appointment
!['Add New Appointment'](https://github.com/unicornteacup/scheduler/blob/master/docs/Add%20New%20Appointment.png?raw=true)

### Delete Appointment Confirmation
!['Delete Appointment Confirmation'](https://github.com/unicornteacup/scheduler/blob/master/docs/Delete%20Appointment%20Confirmation.png?raw=true)
