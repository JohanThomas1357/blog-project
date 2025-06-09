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
  TextField,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField as TextField1 } from "formik-mui";
import * as Yup from "yup";
import { error } from "console";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

interface signupProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRegister: React.MouseEventHandler<HTMLButtonElement>;
  message: string|null;
  setMessage: React.Dispatch<React.SetStateAction<string|null>>;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setRouting: React.Dispatch<React.SetStateAction<boolean>>;
  setRegistrationSuccessful:React.Dispatch<React.SetStateAction<boolean>>;
}

const validateSchema = Yup.object({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});

export default function signup({ open, setOpen, onRegister,message,setMessage,setOpenAlert,setRouting,setRegistrationSuccessful }: signupProps) {
  const [visibility, setVisiblity] = useState<boolean>(false);
  const router = useRouter();
  const { mutate,isPending } = useLogin();
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
          mt={4}
        >
          <Avatar sx={{ bgcolor: "black" }}></Avatar>{" "}
          <Typography variant="h6" component="div" paddingLeft={2}>
            Login
          </Typography>{" "}
        </DialogTitle>
        <Box sx={{ maxWidth: "400px" }} m={5} mt={3}>
          <Stack spacing={2}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validateSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                mutate(values, {
                  onSuccess: (res) => {
                    setSubmitting(false);
                    setOpen(false);
                    resetForm();
                    setRouting(true)
                    localStorage.setItem("Message","Logged in successfully")
                    router.push(`user/${res?.data?.ID}?success=true`);
                    const token = res.headers["authorization"];
                    document.cookie = `token=${token}; path=/`;
                  },
                  onError: () => {
                    console.log("Invalid Credentials!");
                    setMessage("Invalid Credentials!");
                    setRegistrationSuccessful(false)
                    setOpen(false);
                    setOpenAlert(true);
                  },
                });
              }}
            >
              {({ errors, isSubmitting, touched }) => (
                <Form>
                  <Stack spacing={2} flexShrink={1}>
                    <Stack spacing={1}>
                      <Typography component="label" htmlFor="username">
                        Email
                      </Typography>
                      <Field
                        error={touched.email && Boolean(errors.email)}
                        component={TextField1}
                        label="email"
                        id="email"
                        variant="outlined"
                        name="email"
                        helperText={touched.email && errors.email}
                        required
                      />
                    </Stack>
                    <Stack spacing={1}>
                      <Typography component="label" htmlFor="password">
                        Password
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
                                  onClick={() => setVisiblity((prev) => !prev)}
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
                    <Stack>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        {isPending ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                      </Button>
                    </Stack>
                  </Stack>

                  <DialogActions>
                    <Typography>If you don not have an account ,</Typography>
                    <Link component="button" onClick={onRegister}>
                      Create Account
                    </Link>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
}
