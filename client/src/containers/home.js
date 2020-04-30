import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Button, Card, Elevation, ButtonGroup } from "@blueprintjs/core";
import DateRanger from '../components/DateRanger';
import { format } from 'date-fns';


import * as Actions from "../actions/meal";

class Home extends Component {
  currentDate = () => new Date();
  lastDate = (days) => new Date(this.currentDate().getTime() - (days * 24 * 60 * 60 * 1000));
  state = {
    minRange: this.lastDate(30),
    maxRange: this.currentDate(),
    name: undefined,
    mealCalories: undefined,
    mealId: undefined,
    mealDate: undefined
  };

  getHealthyColor = (numerator, diniminator) => {
    const percentage = (100.0 * numerator) / diniminator;
    if (percentage <= 100.0) {
      return "green";
    } else if (percentage > 100.0) {
      return "red";
    }
  };

  onApplyClick = () => {
    const { minRange, maxRange } = this.state;
    this.props.getMeals(format(minRange, 'yyyy/MM/dd'), format(maxRange, 'yyyy/MM/dd'));
  }
  componentDidMount() {
    this.onApplyClick();
  }

  setEditableMeal = (meal) => {
    this.setState({
      mealId: meal._id,
      name: meal.mealName,
      mealCalories: meal.mealCalories,
      mealDate: meal.mealDate,
    })
  }

  onChange(fieldName, fieldValue) {
    this.setState({
      [fieldName]: fieldValue,
    });
  }

  saveOrUpdateMeal = () => {
    const { mealId, mealCalories, mealDate, name } = this.state;

    if (mealId) {
      this.props.updateMeal({
        _id: mealId,
        mealCalories,
        mealDate,
        mealName: name,
      })
    } else {
     this.props.saveMeal({
      mealCalories,
      mealDate,
      mealName: name,
     })
    }
  }

  clearData = () => {
    this.setState({
      name: undefined,
      mealCalories: undefined,
      mealId: undefined,
      mealDate: undefined
    });
  }

  mealsDataDateSortedWise = (listOfMeals) => {
    const mealsData = {};

    if (listOfMeals && Array.isArray(listOfMeals)) {
      listOfMeals.map(meal => {
        if (typeof mealsData[meal.mealDate] === 'undefined')
          mealsData[meal.mealDate] = {
            list: [meal],
            sum: meal.mealCalories
          };
        else
          mealsData[meal.mealDate] = {
            sum: mealsData[meal.mealDate].sum + meal.mealCalories,
            list: [...mealsData[meal.mealDate].list, meal]
          };
      });
    }

    return mealsData;
  }



  render() {
    const { listOfMeals, expectedPerDayIntakeCalorie } = this.props;
    const { name, mealCalories, mealDate } = this.state;
    const lengthListOfMeals = listOfMeals && listOfMeals.length;
    const mealsDataDateSortedWise = this.mealsDataDateSortedWise(listOfMeals);

    return (
      <div className="container">
        <Card interactive={true} elevation={Elevation.TWO}>
          <h3 align="center">Input Your Calories Here!</h3>
          <div align="center">
            <input
              onChange={({ target: { value } }) => this.onChange('name', value)}
              value={name}
              className="bp3-input"
              type="text"
              placeholder="Name Of The Meal"
              dir="auto"
            />

            <input
              onChange={({ target: { value } }) => this.onChange('mealCalories', Number(value))}
              value={mealCalories}
              className="bp3-input"
              type="Number"
              placeholder="Calories"
              dir="auto"
            />

            <input
              onChange={({ target: { value } }) => this.onChange('mealDate', value.replace(/-/g, '/'))}
              value={mealDate && (new Date(Date.parse(mealDate) + 60 * 60 * 24 * 1000)).toISOString().substr(0, 10)}
              className="bp3-input"
              type="date"
              placeholder="Date In YYYY/MM/DD"
              dir="auto"
            />
          </div>
          <br />
          <div align="center">
            <Button text="Add/Update To Your Meal List" onClick={() => this.saveOrUpdateMeal()} />
            <Button text="Clear" onClick={() => this.clearData()} />
          </div>
        </Card>
        <br />
        <div align="center">
          <DateRanger
            minRange={this.state.minRange}
            maxRange={this.state.maxRange}
            onChange={({ selection: { startDate, endDate } }) => {
              this.setState({
                minRange: startDate,
                maxRange: endDate
              });
            }}
          />

          <Button text="Apply" onClick={() => this.onApplyClick()} />
        </div>
        <div align="center">
          <br />
          <div></div>
        </div>
        <br />


        {lengthListOfMeals
          ? Object.keys(mealsDataDateSortedWise).map((date, index) => (
            <div key={index}>
              <Card interactive={true} elevation={Elevation.TWO}>
                <h2 align="center" style={{color: this.getHealthyColor(mealsDataDateSortedWise[date].sum, expectedPerDayIntakeCalorie) }}>
                  {" "}
            You Have Consumed {mealsDataDateSortedWise[date].sum}cal of {expectedPerDayIntakeCalorie}{" "}
                </h2>
                <h5>Date : {date}</h5>
                {mealsDataDateSortedWise[date].list.map((mealObject, index) => (<div key={index}>
                  <h1>{mealObject.mealName}</h1>
                  <span>Calories - {mealObject.mealCalories} cal</span>
                  <div align="right">
                    <ButtonGroup>
                      <Button text="Delete" onClick={() => this.props.removeMeal(mealObject._id)} />
                      <Button text="Edit" onClick={() => this.setEditableMeal(mealObject)} />
                    </ButtonGroup>
                  </div>
                </div>))}
              </Card>
              <br />
            </div>
          )
          ) : <span align="center">No Data Available</span>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listOfMeals: state.meal.savedMeals,
  expectedPerDayIntakeCalorie: state.profile.expectedPerDayIntakeCalorie
});

const mapDispatchToProps = (dispatch) => ({
  getMeals: (minRange, maxRange) => Actions.getMeals(minRange, maxRange)(dispatch),
  saveMeal: (mealData) => Actions.saveMeal(mealData)(dispatch),
  updateMeal: (mealData) => Actions.updateMeal(mealData)(dispatch),
  removeMeal: (mealId) => Actions.removeMeal(mealId)(dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
