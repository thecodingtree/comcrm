'use client';
import {
  Text,
  Title,
  Grid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
} from '@mantine/core';

import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';

import { Formik } from 'formik';

import classes from './CompaniesForm.module.css';
import { ADD_COMPANY } from '@/graphql/mutations';

export default function CompaniesForm() {
  const [addCompany, { data, loading, error }] = useMutation(ADD_COMPANY);

  const { data: session, status } = useSession();

  const handleSubmit = (values: any) => {
    addCompany({
      variables: {
        name: values.name,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
        },
        user: session?.user?.id ?? '',
      },
    });
  };

  return (
    <div className={classes.wrapper}>
      <Title>Add new company</Title>
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
            <Group justify="flex-end" mt="md">
              <Button
                type="submit"
                className={classes.control}
                disabled={loading}
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
