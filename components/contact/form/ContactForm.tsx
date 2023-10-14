'use client';
import { Grid, TextInput, Button, Group } from '@mantine/core';

import { Formik } from 'formik';

import classes from './ContactForm.module.css';

export interface ContactFormProps {
  onSubmit?(values: any): void;
  submitting?: boolean;
}

export default function ContactForm({
  onSubmit,
  submitting,
}: ContactFormProps) {
  const handleSubmit = (values: any) => {
    onSubmit && onSubmit(values);
  };

  return (
    <div className={classes.wrapper}>
      <Formik
        initialValues={{
          name: 'test',
          surName: 'test123',
          street: '',
          city: '',
          state: '',
          zip: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextInput
              id="name"
              name="name"
              label="First Name"
              placeholder="First Name"
              mt="lg"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextInput
              id="surName"
              name="surName"
              label="Last Name"
              placeholder="Last Name"
              mt="lg"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              value={values.surName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Group mt={'lg'}>
              <Grid>
                <Grid.Col span={12}>
                  <TextInput
                    id="street"
                    name="street"
                    label="Street"
                    mt="lg"
                    placeholder="Street"
                    classNames={{
                      input: classes.input,
                      label: classes.inputLabel,
                    }}
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    id="city"
                    name="city"
                    label="City"
                    placeholder="City"
                    classNames={{
                      input: classes.input,
                      label: classes.inputLabel,
                    }}
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    id="state"
                    name="state"
                    label="State"
                    placeholder="State"
                    classNames={{
                      input: classes.input,
                      label: classes.inputLabel,
                    }}
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    id="zip"
                    name="zip"
                    label="Zip"
                    placeholder="Zip"
                    classNames={{
                      input: classes.input,
                      label: classes.inputLabel,
                    }}
                    value={values.zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>
              </Grid>
            </Group>
            <Group justify="center" mt="md">
              <Button
                type="submit"
                className={classes.control}
                disabled={submitting}
              >
                Add Contact
              </Button>
            </Group>
          </form>
        )}
      </Formik>
    </div>
  );
}
