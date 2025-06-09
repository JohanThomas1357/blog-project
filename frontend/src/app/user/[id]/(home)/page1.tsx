// "use client";
// import React, { use, useState } from "react";
// import Navbar from "@/components/navbar";
// import axios, { AxiosError, AxiosResponse } from "axios";
// import { useQuery } from "@tanstack/react-query";
// import UserNav from "@/components/NavContent/user";
// import { Box, Divider, Stack } from "@mui/material";
// import RightBar from "@/components/userComponents/Rightbar";
// import SideBar from "@/components/userComponents/sideBar";
// import Content from "@/components/userComponents/Content";
// import Add from "@/components/userComponents/Add";

// interface UserID {
//   params: Promise<{ id: string }>;
// }

// interface User {
//   id: string;
//   name: string;
// }

// export default function page({ params }: UserID) {
//   const { id } = use(params);
//   const [open,setOpen] = useState<boolean>(false)

//   const fetchUserData = async (id: string): Promise<User> => {
//     const res: AxiosResponse<User> = await axios.get(`/api/user/${id}`);
//     return res.data;
//   };

//   const { data, isLoading, isError, isFetching, error } = useQuery<
//     User,
//     AxiosError
//   >({
//     queryKey: ["user", id],
//     queryFn: () => fetchUserData(id),
//   });

//   const handleDrawer = () =>{
//     setOpen((prev)=>!prev);
//   }

//   return (
//     <>
//       <Box>
//         <Navbar>
//           <UserNav data={data} handleDrawer={handleDrawer}/>
//         </Navbar>

//         <Stack direction="row" spacing={2} sx={{ height: "100%", padding: 3}}>
//           {/* Left Bar */}
//           <SideBar/>
//           <Divider
//             orientation="vertical"
//             flexItem
//           />
//           {/* Content */}
//           <Content />
//           <Box>
//           <Divider orientation="vertical" />
//           </Box>
//           {/* Right Bar */}
//           <RightBar />
//         </Stack>
//         <Add />
//       </Box>
//     </>
//   );
// }
