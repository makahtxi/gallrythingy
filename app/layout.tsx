import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat.jpg",
  description: "Gallery for cat photos",
};

async function TopNav() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const {data: profile} = await supabase.from("profiles").select().eq("id", user?.id)


  return(
    <nav className="w-full flex items-center justify-between p-4 bg-pink-400 mb-4">
      <p>Cat.jpg</p>
      {profile  ?
      <div className="bg-cover bg-center w-8 h-8 rounded-full" style={{backgroundImage: `url(${profile[0].avatar_url})`}}/>
      :
      <p>Log In</p> }
    </nav>
  )
}

export default async function RootLayout({
  children, modal
}:{
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <TopNav/>
        {children}
        {modal}
        <div id="modal-root"/>
      </body>
    </html>
  );
}
