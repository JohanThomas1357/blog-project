"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import UserNav from "@/components/NavContent/user";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  Snackbar,
  Stack,
} from "@mui/material";
import SideBar from "@/components/userComponents/sideBar";
import UserDrawer from "@/components/userComponents/UserDrawer";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ThemeProvider } from "@/context/ThemeContext";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useChangeState } from "@/context/stateContext";

interface User {
  id: string;
  name: string;
}

export default function Page({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const {
    data: user,
    isLoading: userLoading,
    isError,
  } = useFetchUser(id as string);
  const [routing, setRouting] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { state, setState } = useChangeState();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const message = localStorage.getItem("Message")
    setStatus(Boolean(localStorage.getItem("status")));
    if (message) {
      console.log(message);
      setTimeout(() => {
        setOpenAlert(true);
        setMessage(message);
        localStorage.removeItem("Message")
        localStorage.removeItem("status");
      }, 1000);
    }
  }, [state]);

  useEffect(() => {
    setTimeout(() => {
      if (routing) {
        setRouting(false);
      }
    }, 2000);
  }, [routing]);

  useEffect(() => {
    setRouting(false);
  }, [pathname]);

  if (userLoading) {
    return "Redirecting...";
  }

  if (isError) {
    router.push("/not-found");
  }

  return (
    <ThemeProvider>
      <CssBaseline />
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Snackbar
          open={openAlert}
          autoHideDuration={1000} // 3 seconds
          onClose={() => {
            setOpenAlert(false);
            setMessage("");
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={status ? "error" : "success"}
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
          >
            {message}
          </Alert>
        </Snackbar>
        <Navbar>
          <UserNav
            data={{ id: user?.ID, name: user?.username }}
            handleDrawer={() => setOpen(!open)}
            setRouting={setRouting}
          />
        </Navbar>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <UserDrawer />
        </Drawer>
        <Stack direction="row" spacing={2} sx={{ height: "100%", padding: 1 }}>
          <SideBar setRouting={setRouting} />
          <Divider
            orientation="vertical"
            sx={{
              display: { xs: "none", md: "flex" },
              alignSelf: "stretch",
            }}
            flexItem
          />
          {children}
        </Stack>
        <Backdrop open={routing} sx={{ color: "#fff", zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </ThemeProvider>
  );
}
