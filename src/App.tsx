import React from 'react';
import { Formik, Field, Form, useField, FieldAttributes } from 'formik';
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel
} from '@material-ui/core';

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField {...field} placeholder={placeholder} helperText={errorText} />
  );
};

export default function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yogurt: ''
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log('submit : ', data);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <MyTextField
              placeholder="first name"
              name="firstName"
              type="input"
            />
            <div>
              <MyTextField
                placeholder="last name"
                name="lastName"
                type="input"
              />
            </div>
            <Field name="isTall" type="checkbox" as={Checkbox} />
            <div>cookies:</div>
            <Field
              name="cookies"
              type="checkbox"
              value="chocolate chip"
              as={Checkbox}
            />
            <Field
              name="cookies"
              type="checkbox"
              value="snickerdoodle"
              as={Checkbox}
            />
            <Field name="cookies" type="checkbox" value="sugar" as={Checkbox} />
            <div>yogurt</div>
            <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
            <MyRadio
              name="yogurt"
              type="radio"
              value="blueberry"
              label="blueberry"
            />
            <MyRadio name="yogurt" type="radio" value="apple" label="apple" />
            <div>
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
