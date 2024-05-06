import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gallery.cat",
  description: "Gallery for cat photos",
};

async function TopNav() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return(
    <nav className="w-full flex items-center justify-between p-4">
      <p>Cat.jpg</p>
      {user ? <p>{user.email}</p> : <p>Log In</p> }
    </nav>
  )
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <TopNav/>
        {children}
      </body>
    </html>
  );
}
