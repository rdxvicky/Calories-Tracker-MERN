import React, { Component } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from 'react-date-range';

export class DateRanger extends Component {

  handleSelect = (ranges) => {
    this.props.onChange(ranges);
  }
  render() {
    const selectionRange = {
      startDate: this.props.minRange,
      endDate: this.props.maxRange,
      key: 'selection',
    }
    return (
      <DateRange
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
    )
  }
}

export default DateRanger;
