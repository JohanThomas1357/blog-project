import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "@/utils/axiosInstance";
import { PostInfoProps } from "./useFetchPosts";
import { userProfile } from "./useUpdateUser";

export const DeletePostByID = async (id: string | undefined) => {
  const res = await api.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${id}`
  );
  console.log(res)
  return res;
};

export const DeleteUserByID = async (id: string | undefined) => {
  console.log(id);
  const res = await api.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/user/${id}`
  );
  console.log("Response", res);
  return res;
};

export function useDeleteUser() {
  return useMutation({
    mutationFn: (id: string | undefined) => DeleteUserByID(id),
  });
}

export function useDeletePost() {
  return useMutation({
    mutationFn: (id: string | undefined) => DeletePostByID(id),
  });
}
