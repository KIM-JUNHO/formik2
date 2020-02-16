import React from 'react';
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray
} from 'formik';
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import * as yup from 'yup';

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
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10)
});

export default function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yogurt: '',
          pets: [{ type: 'cat', name: 'jarvis', id: '' + Math.random() }]
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log('submit : ', data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
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
            <FieldArray name="pets">
              {arrayHelpers => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        type: 'frog',
                        name: '',
                        id: '' + Math.random()
                      })
                    }
                  >
                    add pet
                  </Button>
                  {values.pets.map((pet, index) => {
                    return (
                      <div key={pet.id}>
                        <MyTextField
                          placeholder="pet name"
                          name={`pets.${index}.name`}
                        />
                        <Field
                          name={`pets.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="cat">cat</MenuItem>
                          <MenuItem value="dog">dog</MenuItem>
                          <MenuItem value="frog">frog</MenuItem>
                        </Field>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
