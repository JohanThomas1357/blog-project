"use client";
import { useCreatePost } from "@/hooks/useCreatePost";
import {
  Description,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import Picker from "emoji-picker-react";
import { useChangeState } from "@/context/stateContext";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "@/hooks/useFetchUser";
import {  useUpdatePost } from "@/hooks/useUpdateUser";

const validationSchema = Yup.object({
  title: Yup.string().min(5, "Minimum 5 characters required").required(),
  description: Yup.string()
    .min(10, "Minimum 10 characters required")
    .required(),
  userID: Yup.string().required(),
});


interface PostProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status?: string|undefined
  data?:Post | undefined
}



export default function CreatePost({ open, setOpen,status,data }: PostProps) {
  const [activeField, setActiveField] = useState<
    "title" | "description" | null
  >(null);
  const queryClient = useQueryClient();
  const [showPicker, setShowPicker] = useState(false);
  const {state,setState} = useChangeState();
  const { id } = useParams(); // Ensure id is a string
  const { mutate:CreatePost } = useCreatePost();
  const {mutate:UpdatePost} = useUpdatePost();
  return (
    <Modal
      open={open}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      onClose={() =>{ setOpen(false);setShowPicker(false);}}
    >
      <Formik
        initialValues={{
          title: data?.title ?? "",
          description: data?.description ?? "",
          userID: String(id),
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // alert(JSON.stringify(values, null, 2));
          const modifiedValues = {
            title: values.title,
            description: values.description,
            // createdAt: new Date().toISOString,
          };
          if(status){
            UpdatePost({id:String(data?.ID),modifiedData:modifiedValues},{
                onSuccess:()=>{
                  localStorage.setItem("Message","Updated post successfully")
                  queryClient.resetQueries();
                  setState((prev)=>!prev)
                  setOpen(false)
                },
                onError:()=>{
                  setState((prev)=>!prev)
                  localStorage.setItem("status","true")
                  localStorage.setItem("Message","Unable to update post")
                  setSubmitting(false)
                  setOpen(false)
                }
            })
          }
          else{
            CreatePost(modifiedValues, {
              onSuccess: () => {
                localStorage.setItem("Message","Created post successfully")
                queryClient.resetQueries();
                setState((prev)=>!prev)
                resetForm();
                setOpen(false);
              },
              onError: () => {
                setState((prev)=>!prev)
                localStorage.setItem("status","true")
                localStorage.setItem("Message","Unable to create post")
                setSubmitting(false);
                setOpen(false);
              },
            });
          }
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue, values }) => (
          <Form>
            <Box
              width={400}
              height={365}
              sx={{
                width: { xs: "80vw", md: "400px" },
                height: { xs: "60vh", md: "365px" },
                margin: { xs: "30px", md: "0px" },
              }}
              borderRadius={3}
              color={"text.primary"}
              bgcolor={"background.default"}
              p={4}
            >
              <Box
                sx={{
                  height: "100%",
                  overflowY: "auto",
                  paddingRight: "5px",
                  "&::-webkit-scrollbar": { width: "3px" },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", fontWeight: "550" }}
                  color="textSecondary"
                  mb={2}
                >
                  {status ? "Update Post":"Create Post"}
                </Typography>

                {/* Title Field */}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  mt={2}
                  sx={{ fontWeight: "bold" }}
                >
                  Title
                </Typography>
                <Field
                  as={TextField}
                  id="title"
                  name="title"
                  variant="standard"
                  fullWidth
                  placeholder="Enter your title"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  onFocus={() => setActiveField("title")}
                />

                {/* Description Field */}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ mt: 1, fontWeight: "bold" }}
                >
                  Description
                </Typography>
                <Field
                  as={TextField}
                  id="description"
                  name="description"
                  variant="standard"
                  multiline
                  rows={2}
                  fullWidth
                  placeholder="What's on your mind?"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  onFocus={() => setActiveField("description")}
                />

                {/* Icons */}
                <Stack direction="row" mt={2} mb={1}>
                  <IconButton onClick={() => setShowPicker((val) => !val)}>
                    <EmojiEmotions color="primary" />
                  </IconButton>
                  <IconButton>
                    <Image color="error" />
                  </IconButton>
                  <IconButton>
                    <VideoCameraBack color="success" />
                  </IconButton>
                  <IconButton>
                    <PersonAdd color="secondary" />
                  </IconButton>
                </Stack>

                {/* Submit Button */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "350px" }}
                    disabled={isSubmitting}
                  >
                    {status?"UPDATE":"POST"}
                  </Button>
                </Box>
              </Box>
              {showPicker && (
                <Picker
                previewConfig={{showPreview:false}}
                skinTonesDisabled={true} 
                  style={{ zIndex: 2, height: "300px", width: "400px",position:"fixed",top:"50px",bottom:"50px"}}
                  reactionsDefaultOpen={false}
                  onEmojiClick={(emojiObject) => {
                    if (activeField) {
                      setFieldValue(
                        activeField,
                        values[activeField] + emojiObject.emoji
                      );
                    }
                    setShowPicker(false);
                  }}
                />
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
