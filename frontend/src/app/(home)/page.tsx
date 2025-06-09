"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Navbar from "@/components/navbar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Signin from "@/components/signin";
import Signup from "@/components/signup";
import HomeNav from "@/components/NavContent/home";
import { useChangeState } from "@/context/stateContext";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSignup, setOpenSignUp] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [routing, setRouting] = useState<boolean>(false);
  const [registerationSuccessful, setRegistrationSuccessful] = useState<boolean>(false);
  const [isProcessing,setIsProcessing] = useState<boolean>(true)

  const handleRegister = () => {
    if (open) {
      setOpen(false);
    }
    setOpenSignUp((prev) => !prev);
  };

  useEffect(()=>{
    const messageStored = localStorage.getItem("LogoutMessage")
    if(messageStored){
      setRegistrationSuccessful(true);
      setOpenAlert(true)
      setMessage(messageStored);
      localStorage.removeItem("LogoutMessage")
    }
    setIsProcessing(false)
  },[])

  if(isProcessing){
    return "Redirecting..."
  }

  return (
    <>
      <Navbar>
        <HomeNav setIsOpen={setOpen} />
      </Navbar>
      <Backdrop open={routing} sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box padding={4}>
        <Stack spacing={2}>
          <Stack sx={{ bgcolor: "#9ACBD0" }}>
            <Grid container>
              <Grid size={{ md: 4 }} padding={4}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    height: "350px",
                    maxWidth: "500px",
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ md: 8 }} padding={4}>
                <Stack spacing={2}>
                  <Stack>
                    <Typography variant="h4">
                      Technology – Latest Trends, AI, Coding Tutorials
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="body1" mt={2} mr={10}>
                      Stay ahead in the digital world with our in-depth coverage
                      of technology trends, AI innovations, and coding
                      tutorials. Whether you're a beginner or an experienced
                      developer, we provide step-by-step guides, industry
                      insights, and expert tips to keep you updated on the
                      latest in software development, machine learning, and
                      emerging tech.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography component="div">
                      <ul style={{ paddingLeft: "4px", listStyleType: "none" }}>
                        <li>
                          ✔ <strong> Web & Mobile Development</strong>
                        </li>
                        <li>
                          ✔{" "}
                          <strong>
                            Artificial Intelligence & Machine Learning
                          </strong>
                        </li>
                        <li>
                          ✔{" "}
                          <strong>
                            Programming Languages (JavaScript, TypeScript,
                            Python, etc.)
                          </strong>
                        </li>
                        <li>
                          ✔ <strong>Cybersecurity & Cloud Computing</strong>
                        </li>
                      </ul>
                    </Typography>
                  </Stack>
                  <Stack paddingRight={5} sx={{ justifyItems: "flex-start" }}>
                    <Button
                      variant="contained"
                      startIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: "#48A6A7",

                        width: "200px",
                        marginTop: "20px",
                        marginLeft: "auto",
                      }}
                      onClick={() => setOpen(true)}
                    >
                      Create Post
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ bgcolor: "#F2EFE7" }}>
            <Grid
              container
              sx={{ flexDirection: { md: "row-reverse" } }}
              padding={4}
            >
              <Grid size={{ md: 4 }}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    height: "350px",
                    maxWidth: "500px",
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=600"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ md: 8 }} paddingTop={4}>
                <Stack spacing={2}>
                  <Stack>
                    <Typography variant="h4">
                      Business & Productivity – Growth Hacks, Entrepreneurship
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="body1" mt={2} mr={10}>
                      Unlock the secrets of business success, entrepreneurship,
                      and productivity hacks. Whether you're a startup founder,
                      freelancer, or corporate professional, our articles
                      provide actionable strategies, time management techniques,
                      and industry insights to help you maximize efficiency and
                      grow your business.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography component="div">
                      <ul
                        style={{ paddingLeft: "20px", listStyleType: "none" }}
                      >
                        <li>
                          ✔ <strong>Entrepreneurship & Startup Growth</strong>
                        </li>
                        <li>
                          ✔ <strong>Productivity & Time Management Tips</strong>
                        </li>
                        <li>
                          ✔ <strong>Marketing & Branding Strategies</strong>
                        </li>
                        <li>
                          ✔ <strong>Business Trends & Innovations</strong>
                        </li>
                      </ul>
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          {/* Design & Creativity – UI/UX, Branding, Inspiration */}
          <Stack sx={{ bgcolor: "#48A6A7" }} padding={4}>
            <Grid container>
              <Grid size={{ md: 4 }}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    height: "350px",
                    maxWidth: "500px",
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/632470/pexels-photo-632470.jpeg?auto=compress&cs=tinysrgb&w=600"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ md: 8 }} padding={4}>
                <Stack spacing={2}>
                  <Stack>
                    <Typography variant="h4">
                      Design & Creativity – UI/UX, Branding, Inspiration
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="body1" mt={2} mr={10}>
                      Creativity drives innovation! Explore the world of graphic
                      design, UI/UX principles, branding, and creative thinking.
                      We share expert tips, best practices, and real-world case
                      studies to help designers and creators elevate their work
                      and build compelling digital experiences.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography component="div">
                      <ul style={{ paddingLeft: "4px", listStyleType: "none" }}>
                        <li>
                          ✔ <strong>UI/UX Design & Best Practices</strong>
                        </li>
                        <li>
                          ✔ <strong>Branding & Visual Identity</strong>
                        </li>
                        <li>
                          ✔ <strong>Graphic Design Tools & Techniques</strong>
                        </li>
                        <li>
                          ✔ <strong>Creative Thinking & Innovation</strong>
                        </li>
                      </ul>
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          {/* Personal Development – Mindset, Motivation */}
          <Stack sx={{ bgcolor: "#9ACBD0" }}>
            <Grid
              container
              sx={{ flexDirection: { md: "row-reverse" } }}
              padding={4}
            >
              <Grid size={{ md: 4, sm: 12, xs: 12 }}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    height: "350px",
                    maxWidth: "500px",
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/6956352/pexels-photo-6956352.jpeg?auto=compress&cs=tinysrgb&w=600"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ md: 8 }} paddingTop={4}>
                <Stack spacing={2}>
                  <Stack>
                    <Typography variant="h4">
                      Personal Development – Mindset, Motivation
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="body1" mt={2} mr={10}>
                      Success starts with the right mindset! Our personal
                      development section is dedicated to helping you build
                      confidence, develop productive habits, and stay motivated.
                      Whether you're looking for self-improvement tips, career
                      growth advice, or mental wellness strategies, this space
                      is designed to empower you to reach your full potential.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography component="div">
                      <ul style={{ paddingLeft: "4px", listStyleType: "none" }}>
                        <li>
                          ✔ <strong>Self-Improvement & Habit Building</strong>
                        </li>
                        <li>
                          ✔ <strong>Mindset & Motivation Techniques</strong>
                        </li>
                        <li>
                          ✔ <strong>Work-Life Balance & Mental Wellness</strong>
                        </li>
                        <li>
                          ✔{" "}
                          <strong>
                            Career Growth & Professional Development
                          </strong>
                        </li>
                      </ul>
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          © {new Date().getFullYear()} AyinuBlog All rights reserved.
        </Typography>
      </Box>
      <Signin
        open={open}
        setOpen={setOpen}
        onRegister={handleRegister}
        message={message}
        setMessage={setMessage}
        setRouting={setRouting}
        setRegistrationSuccessful={setRegistrationSuccessful}
        setOpenAlert={setOpenAlert}
      />
      <Signup
        open={openSignup}
        setOpenSignUp={setOpenSignUp}
        message={message}
        setMessage={setMessage}
        setRegistrationSuccessful={setRegistrationSuccessful}
        setOpenAlert={setOpenAlert}
      />

      <Snackbar
        open={openAlert}
        autoHideDuration={1000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={registerationSuccessful ? "success" : "error"}
          sx={{
            width: "400px",
            height: "60px",
            fontSize: "18px",
            "& .MuiAlert-icon": {
              "& svg": {
                fontSize: "30px",
              },
            },
          }}
          onClose={() =>{setOpenAlert(false);setMessage("");setRegistrationSuccessful(false)}}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
