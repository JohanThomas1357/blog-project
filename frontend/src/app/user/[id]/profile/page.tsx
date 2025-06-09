"use client";
import {
  Box,
  Typography,
  Grid2,
  Paper,
  Avatar,
  Badge,
  IconButton,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useFetchUser } from "@/hooks/useFetchUser";
import * as Yup from  "yup"
import { Formik,Form } from "formik";
import { TextField } from "@/app/utils/formik/textField";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useQueryClient } from "@tanstack/react-query";
import {useDeleteUser } from "@/hooks/useDelete";
import { useRouter } from "next/navigation";
import { useChangeState } from "@/context/stateContext";

export default function page() {
  const [edit, setEdit] = useState<boolean>(true);
  const { id } = useParams();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert("File uploaded");
  };

  const { data:user, isLoading:userLoading,isError } = useFetchUser(id as string);

  const validateSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    bio: Yup.string().required()
  })

  const {mutate} = useUpdateUser();
  const queryClient = useQueryClient();

  const {mutate:DeleteUserByID} = useDeleteUser();
  const router = useRouter();
  const{state,setState} = useChangeState();

  if(isError){
    router.push("/not-found")
  }

  const handleDeleteAccount = () =>{
    const confirm = window.confirm("Do you want to delete your account?");
    if(confirm){
      DeleteUserByID(String(user?.ID),{
        onSuccess:()=>{
          localStorage.setItem("DeleteStatus","Deleted successfully")
          queryClient.removeQueries(),
          window.location.href="/"
        }
      })
    }
    else{
      console.log("Deletion cancelled")
    }
  }


  if (userLoading) {
    return (
      <Box flex={7.95} sx={{ height:"100%" }}>
        <Backdrop
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  }

  return (
    <Box flex={7.95} sx={{ height:"100%" }}>
      <Typography variant="h5" color="textSecondary" p={6} pb={0}>
        Profile Settings
      </Typography>
      <Box sx={{ display: "flex", padding: "50px" }}>
      <Formik
          initialValues={{
            name: user?.username || "",
            email: user?.email || "",
            bio: user?.bio || "",
            id: String(id)
          }}
          validationSchema={validateSchema}
          onSubmit = {(values,{setSubmitting,resetForm})=>{
            // console.log(values);
            const modifiedData = {
              username:values.name,
              email:values.email,
              bio:values.bio,
            }
            const id = values.id
            mutate({modifiedData,id},{
              onSuccess:()=>{
                localStorage.setItem("Message","Updated successfully")
                queryClient.resetQueries(),
                resetForm();
                setState((prev)=>!prev)
                setEdit(true);
              },
              onError:()=>{
                localStorage.setItem("Message","Unable to update user profile")
                localStorage.setItem("status","true")
                setState((prev)=>!prev)
              },
              onSettled:()=>{
                setSubmitting(false);
              }
            })
          }}
        >
          {({errors,touched,isSubmitting})=>(
          <Form>
          <Paper sx={{ maxWidth: "900px", padding: "50px" }}>
  
            <Grid container spacing={4}>
              <Grid container size={12} justifyContent={"center"}>
                <Badge
                  badgeContent={
                    <>
                      <input
                        type="file"
                        id="file-input"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-input">
                        <IconButton component="span">
                          <Edit sx={{ fontSize: 18, color: "white" }} />
                        </IconButton>
                      </label>
                    </>
                  }
                  color="primary"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  sx={{
                    "& .MuiBadge-badge": {
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      display: !edit ? "flex" : "none",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Avatar sx={{ width: 100, height: 100 }} />
                </Badge>
              </Grid>
              <Grid container size={12} spacing={1}>
                <Grid size={12}>
                  <Typography variant="h6">Name</Typography>
                </Grid>
                <Grid size={12}>
                  <TextField
                    id = "name"
                    name = "name"
                    error ={Boolean(errors.name) && touched.name}
                    helperText={errors.name && touched.name}
                    size="small"
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: edit,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container size={12} spacing={1}>
                <Grid size={12}>
                  <Typography variant="h6">Email</Typography>
                </Grid>
                <Grid size={12}>
                  <TextField
                    id = "email"
                    name = "email"
                    error ={Boolean(errors.email) && touched.email}
                    helperText={errors.email && touched.email}
                    size="small"
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: edit,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container size={12} spacing={1}>
                <Grid size={12}>
                  <Typography defaultValue="" variant="h6">
                    Bio
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <TextField
                    id ="bio"
                    name = "bio"
                    error ={Boolean(errors.bio) && touched.bio}
                    helperText={errors.bio && touched.bio}
                    size="small"
                    fullWidth
                    multiline
                    rows={5}
                    slotProps={{
                      input: {
                        readOnly: edit,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} size={12}>
                <Grid
                  container
                  size={6}
                  alignItems="center"
                  spacing={1}
                  sx={{ display: !edit ? "none" : "flex" }}
                >
                  <IconButton onClick={() => setEdit(false)}>
                    <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
                      <Edit />
                    </Avatar>
                  </IconButton>
                  <Typography color="textSecondary">Edit Profile</Typography>
                </Grid>
                <Grid
                  container
                  size={6}
                  spacing={0}
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{ display: !edit ? "none" : "flex" }}
                >
                  <IconButton sx={{ padding: 1 }}  onClick={handleDeleteAccount}>
                    <Delete color="error" />
                  </IconButton>
                  <Typography color="textSecondary">Delete Account</Typography>
                </Grid>
                <Grid
                  size={12}
                  container
                  justifyContent="flex-end"
                  sx={{ display: edit ? "none" : "flex" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
