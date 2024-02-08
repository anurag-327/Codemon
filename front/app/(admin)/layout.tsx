"use client";
import Navbar from "@/components/Navbar";
import { useStore } from "@/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, setUser } = useStore();
  useEffect(() => {
    if (user) {
      if (user.role != "admin") router.push("/error");
    } else {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
