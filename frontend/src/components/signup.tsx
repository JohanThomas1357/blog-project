"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Link,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField as TextField1 } from "formik-mui";
import * as Yup from "yup";
import { useCreateUser } from "@/hooks/useCreateUser";

const validateSchema = Yup.object({
  username: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Requried"),
  phone_number: Yup.string().length(10,"Invalid Number").required("Required"),
  confirm_password: Yup.string()
  .oneOf([Yup.ref("password")],"Password must match")
  .required("Required")
});

interface signupProps {
  open: boolean,
  setOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>
  message: string|null,
  setMessage:React.Dispatch<React.SetStateAction<string|null>>
  setRegistrationSuccessful:React.Dispatch<React.SetStateAction<boolean>>
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>
}

export default function signup({open,setOpenSignUp,message,setMessage,setRegistrationSuccessful,setOpenAlert}:signupProps) {
  const [next, setNext] = useState<number>(0);
  const [visibility, setVisiblity] = useState<boolean>(false);
  const {mutate,isPending} = useCreateUser();
  return (
    <Box>
      <Dialog open={open} onClose={()=>setOpenSignUp(false)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            padding:{xs:1},
            mt:{xs:1,md:4}
          }}
        >
          <Avatar sx={{ bgcolor: "black" }}></Avatar>{" "}
          <Typography variant="h6" component="div" paddingLeft={2}>
            Register
          </Typography>{" "}
        </DialogTitle>
        <Box
          sx={{
            maxWidth: { sm: "400px", md: "none" },
            minWidth: { sm: "300px", md: "400px" },
            m:{xs:2,sm:5},
            mt:{xs:1,sm:3}
          }}

        >
          <Stack spacing={2}>
            <Formik
              initialValues={{
                username: "",
                password: "",
                confirm_password:"",
                email: "",
                phone_number: "",
              }}
              validationSchema={validateSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const modifiedData = {
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  phone_number: values.phone_number
                }
                mutate(modifiedData,{
                  onSuccess() {
                    setMessage("Registration Successfull")
                    setRegistrationSuccessful(true)
                    setSubmitting(false);
                    resetForm();
                    setOpenSignUp(false);
                    setOpenAlert(true)
                  },
                  onError(){
                    console.log("Failed to register user")
                    setMessage("Failed to register user")
                    setRegistrationSuccessful(false)
                    setSubmitting(false);
                    resetForm();
                    setOpenSignUp(false);
                    setOpenAlert(true)
                  }
                })
              }}
            >
              {({ errors, isSubmitting, touched }) => (
                <Form>
                  <Stack spacing={2} flexShrink={1}>
                    <Box
                      sx={{
                        display: next === 0 ? "flex" : "none",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography component="label" htmlFor="username">
                          Userame
                        </Typography>
                        <Field
                          error={touched.username && Boolean(errors.username)}
                          component={TextField1}
                          label="username"
                          id="username"
                          variant="outlined"
                          name="username"
                          helperText={touched.username && errors.username}
                          required
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <Typography component="label" htmlFor="email">
                          Email
                        </Typography>
                        <Field
                          error={touched.email && Boolean(errors.email)}
                          component={TextField1}
                          label="email"
                          type="email"
                          id="email"
                          variant="outlined"
                          name="email"

                          helperText={touched.email && errors.email}
                          required
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <Typography component="label" htmlFor="phone_number">
                          Mobile Number
                        </Typography>
                        <Field
                          error={
                            touched.phone_number && Boolean(errors.phone_number)
                          }
                          component={TextField1}
                          type="string"
                          label="phone_number"
                          id="phone_number"
                          variant="outlined"
                          name="phone_number"
                          helperText={
                            touched.phone_number && errors.phone_number
                          }
                          required
                        />
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        display: next === 1 ? "flex" : "none",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography component="label" htmlFor="password">
                          New Password
                        </Typography>
                        <Field
                          error={touched.password && Boolean(errors.password)}
                          component={TextField1}
                          type={visibility ? "text" : "password"}
                          label="password"
                          id="password"
                          name="password"
                          variant="outlined"
                          helperText={touched.password && errors.password}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setVisiblity((prev) => !prev)
                                    }
                                  >
                                    {visibility ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                          required
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <Typography component="label" htmlFor="password">
                          Confirm Password
                        </Typography>
                        <Field
                          error={touched.confirm_password && Boolean(errors.confirm_password)}
                          component={TextField1}
                          type={visibility ? "text" : "password"}
                          label="confim_password"
                          id="confirm_password"
                          name="confirm_password"
                          variant="outlined"
                          autoComplete="new-password"
                          helperText={touched.confirm_password && errors.confirm_password}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setVisiblity((prev) => !prev)
                                    }
                                  >
                                    {visibility ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                          required
                        />
                      </Stack>
                    </Box>
                    <Stack sx={{ display: next === 0 ? "none" : "flex" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        {isPending && <CircularProgress color="inherit"/>}
                        Register
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
          <DialogActions>
            <Button
              sx={{ display: next === 0 ? "none" : "block" }}
              onClick={() => setNext((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              sx={{ display: next === 1 ? "none" : "block" }}
              onClick={() => setNext((prev) => prev + 1)}
            >
              Next
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
