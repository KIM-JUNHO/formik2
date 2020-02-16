import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@material-ui/core';

export default function App() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: 'bob' }}
        onSubmit={data => {
          alert(data.firstName);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
        )}
      </Formik>
    </div>
  );
}
