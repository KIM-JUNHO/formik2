import React from 'react';
import { Formik, Field } from 'formik';
import { TextField, Button } from '@material-ui/core';

export default function App() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: '', lastName: '' }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log('submit : ', data);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName" type="input" as={TextField} />
            <Field name="lastName" type="input" as={TextField} />
            <div>
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}
