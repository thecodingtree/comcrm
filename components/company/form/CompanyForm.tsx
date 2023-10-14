'use client';
import { Grid, TextInput, Button, Group } from '@mantine/core';

import { Formik } from 'formik';

import classes from './CompanyForm.module.css';

export interface CompanyFormProps {
  onSubmit?(values: any): void;
  submitting?: boolean;
}

export default function CompaniesForm({
  onSubmit,
  submitting,
}: CompanyFormProps) {
  const handleSubmit = (values: any) => {
    onSubmit && onSubmit(values);
  };

  return (
    <div className={classes.wrapper}>
      <Formik
        initialValues={{
          name: '',
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
              label="Name"
              placeholder="Company"
              mt="lg"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              value={values.name}
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
                Add Company
              </Button>
            </Group>
          </form>
        )}
      </Formik>
    </div>
  );
}
