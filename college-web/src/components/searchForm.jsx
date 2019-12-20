import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import { searchCollege } from "../services/collegeService";
import { fetchLocation } from "../services/googleMapService";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



class LoginForm extends Form {
  state = {
    data: {
      zipCode: "",
      distance: "10mi",
      year: "2017",
      predominantDegrees: "2,3"
    },
    colleges: [],
    lat:48.00,
    lng:-122.00,
    errors: {}
  };

  schema = {
    zipCode: Joi.string()
      .required()
      .label("ZipCode"),
    distance: Joi.string()
      .required()
      .label("Distance"),
    year: Joi.string()
      .required()
      .label("Year"),
    predominantDegrees: Joi.string()
      .required()
      .label("PredominantDegrees")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: colleges } = await searchCollege(data);
      this.setState({ colleges });
      console.log(colleges);
      //this.fetchLocation();
     // this.props.history.push("/search");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  async fetchLocation(){
     const response = await fetchLocation("52557");
     const location = response.data.results[0].geometry.location;
     this.setState({lat:location.lat,lng:location.lng})
     console.log("location",location);
  }

  render() {

    const location = { lat: this.state.lat, lng: this.state.lng};

  const mapStyles = {
    width: '90%',
    height: '500px',
  };

    return (
      <div>
        <h1>Search Colleges </h1>

        <div class="row">
  <div class="col-6">
  <form onSubmit={this.handleSubmit}>
          {this.renderInput("zipCode", "ZipCode")}
          {this.renderInput("distance", "Distance")}
          {this.renderInput("year", "Year")}
          {this.renderInput("predominantDegrees", "PredominantDegrees")}

          {this.renderButton("Search College")}
        </form>
        <div className = "m-2">
            <h3>Map</h3>
        </div>
  <h2>{this.state.lat} {this.state.lng}</h2>  
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          <Marker position={location}  />
        </Map>
        
  </div>
  <div class="column">
  <table className="table table-striped " id="data-table">
      <thead>
          <tr>
            <td>School Name</td>
            <td>No of Students</td>
          </tr>
      </thead>  
      <tbody> 
          {this.state.colleges.map(college => (
            <tr key={college.id}>
              <td>{college.schoolName}</td>
              <td>{college.schoolSize}</td>
            </tr>
          ))}
           </tbody>
        </table>
       
  </div>
</div> 
      

        
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBdue_vrXP0HW9AESpNhQDDx7vqPOA2L3k'
})(LoginForm);

