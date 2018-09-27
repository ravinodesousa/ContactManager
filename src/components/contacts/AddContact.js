import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    showContactInfo: true,
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Number is required" } });
      return;
    }
    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({ type: "ADD_CONTACT", payload: res.data });

    this.setState({ name: "", email: "", phone: "", errors: {} });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                Add New Contact
                <i
                  className="far fa-plus-square"
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                />
              </div>
              {this.state.showContactInfo ? (
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="name"
                      name="name"
                      value={name}
                      placeholder="Enter Name.."
                      type="text"
                      onchange={this.change}
                      error={errors.name}
                    />

                    <TextInputGroup
                      label="email"
                      name="email"
                      value={email}
                      placeholder="Something@something.com"
                      type="text"
                      onchange={this.change}
                      error={errors.email}
                    />

                    <TextInputGroup
                      label="phone"
                      name="phone"
                      value={phone}
                      placeholder="Enter Phone number.."
                      type="text"
                      onchange={this.change}
                      error={errors.phone}
                    />

                    <input
                      type="Submit"
                      className="btn btn-success btn-block"
                      value="Add Contact"
                    />
                  </form>
                </div>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
