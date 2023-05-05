import React from 'react';

export default function ZHMTextArea({
  input,
  label,
  type,
  rows,
  className,
  meta: { touched, error, warning }
}) {
  return (
    <div className='form-group'>
      <label>{label}</label>
      <div className='input-group'>
        <textarea {...input} type={type} rows={rows} className={className}></textarea>
      </div>
      {touched && error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
}
