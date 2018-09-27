import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class Update extends Component {
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

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

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
    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

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
                Edit Contact
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
                      value="Update Contact"
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

export default Update;
