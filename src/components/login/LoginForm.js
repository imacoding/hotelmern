import React, { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { ZHMInput } from '../shared/form/ZHMInput';
import ZHMResError from '../shared/form/ZHMResError';
import { required, minLength4 } from '../shared/form/validator';

const LoginForm = (props) => {
  const [errors, setErrors] = useState([]);

  const { handleSubmit, pristine, submitting, submitCb, valid, errors: propsErrors } = props;

  useEffect(() => {
    if (propsErrors && propsErrors.length) {
      setErrors(propsErrors);
    }
  }, [propsErrors]);

  const componentDidUpdate = (prevProps) => {
    if (prevProps.errors !== errors) {
      setErrors(props.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={ZHMInput}
        validate={[required, minLength4]}
      />

      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={ZHMInput}
        validate={[required]}
      />

      <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
        Login
      </button>

      <ZHMResError errors={errors} />
    </form>
  );
};

const loginFormConfig = {
  form: 'loginForm',
};

export default reduxForm(loginFormConfig)(LoginForm);
