"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { API_URL } from "@/credentials";
import { useEffect } from "react";
import { getToken } from "@/helper/tokenhandler";
import Router from "next/router";
const inter = Inter({ subsets: ["latin"] });
import { useStore } from "@/zustand/useStore";
import Loader from "@/components/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const globalLoading = useStore((state) => state.globalLoading);
  const setGlobalLoading = useStore((state) => state.setGlobalLoading);
  useEffect(() => {
    const token = getToken();
    if (token) {
      (async function () {
        try {
          const body = {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          };
          const res = await fetch(API_URL + "/api/user/get-minidata", body);
          const userData = await res.json();
          if (userData.status == 200) {
            setUser(userData.user);
            setGlobalLoading(false);
          } else {
            console.log("token misssing");
            setGlobalLoading(false);
            console.log("Mini data fetch failed");
          }
        } catch (error) {
          setGlobalLoading(false);
          console.log(error);
        }
      })();
    } else {
      setGlobalLoading(false);
    }
    Router.events.on("routeChangeStart", () => setGlobalLoading(true));
    Router.events.on("routeChangeComplete", () => setGlobalLoading(false));
    Router.events.on("routeChangeError", () => setGlobalLoading(false));
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Codemon</title>
      </head>
      <body className={inter.className}>
        {globalLoading ? (
          <main className="box-content flex flex-col items-center justify-center min-h-screen gap-3">
            <Loader />
            <span>Setting Up Dashboard</span>
          </main>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
