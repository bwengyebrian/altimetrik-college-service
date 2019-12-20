import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CollegeResults from "./components/collegeResults"
import SearchForm from "./components/searchForm";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/navBar";

class App extends Component {
  state = {
    collegeData:[]
  };
  setCollegeData(data){
    // const collegeData = [...this.state.collegeData];
    // this.setState({collegeData})
  }
  componentDidMount() {
   
  }

  render() {

    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route
              path="/search"
              render={props => <CollegeResults {...props} setCollegeData={this.setCollegeData} />}
            />
            <Route path="/home" component={SearchForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
