import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './ContactsForm.module.css';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    const isValidFrom = this.validateFrom();
    if (!isValidFrom) return;

    this.props.onSubmit({ name, number });

    this.setState({ name: '', number: '' });
  };

  validateFrom = () => {
    const { name, number } = this.state;
    const { checkExistingContacts } = this.props;

    if (!name || !number) {
      alert('Some input is empty');
      return false;
    }

    return checkExistingContacts(name);
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={s.container}>
          <label>
            Enter the name
            <input
              type="text"
              value={name}
              name="name"
              onChange={this.handleInput}
            />
          </label>
          <label>
            Enter the number
            <input
              type="tel"
              value={number}
              name="number"
              onChange={this.handleInput}
            />
          </label>
        </div>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactsForm;

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
