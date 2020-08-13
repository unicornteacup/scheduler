import React from "react";
import "components/DayListItem.scss";
import Classnames from "classnames";

// Function to display the number of open spots remaining for each week day 

export default function DayListItem(props) {
  const formatSpots = function (props) {
    let spotsRemaining = props.spots
    if (props.spots === 0) {
      spotsRemaining = 'no spots remaining'
    } else if (props.spots === 1) {
      spotsRemaining = '1 spot remaining'
    } else {
      spotsRemaining = `${spotsRemaining} spots remaining`
    }
    return spotsRemaining
  }


  const dayClass = Classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li data-testid="day"
    className = {dayClass}
    onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}