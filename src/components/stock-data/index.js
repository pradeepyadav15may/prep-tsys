
import React, { Component } from "react";
import "./index.css";

export default class StockData extends Component {
  static initialState = {
    inputDate: "",
    stockList: [],
    fetchError: false,
  };

  constructor(props) {
    super(props);
    this.state = StockData.initialState;
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  changeHandler(e) {
    this.setState({
      inputDate: e.currentTarget.value,
    });
  }

  handleSearch(e) {
    const { inputDate } = this.state;
    const that = this;

    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${inputDate}`)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then((responseData) => {
          const { data } = responseData;

          that.setState({
            stockList: data,
            fetchError: false,
          });
        });
      }
    )
    .catch((err) => {
      that.setState({
        fetchError: true,
      });
      console.log('Fetch Error :-S', err);
    });
  }

  renderList() {
    const { stockList } = this.state;
    const stockData = stockList[0];

    return (
      <React.Fragment>
        <li className="py-10">Open: {stockData.open}</li>
        <li className="py-10">Close: {stockData.close}</li>
        <li className="py-10">High: {stockData.high}</li>
        <li className="py-10">Low: {stockData.low}</li>
      </React.Fragment>
    );
  }

  render() {
    const { inputDate, stockList } = this.state;

    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input
            type="text"
            className="large"
            placeholder="Input date in 5-January-2000 format"
            id="app-input"
            data-testid="app-input"
            onChange={this.changeHandler}
            value={inputDate}
          />
          <button
            className=""
            id="submit-button"
            data-testid="submit-button"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </section>

        {(stockList.length !== 0)
          ? <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data" >
            {this.renderList()}
          </ul>
          : <div data-testid="no-result">No Results Found</div>
        }
      <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result"></div>
      </div>
    );
  }
}
