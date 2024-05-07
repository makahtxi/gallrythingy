'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import Image from "next/image"
import { fileURLToPath } from "url"


export default function Page(){

    const supabase = createClient()
    const [avatar, setURL] = useState<string> ("")

    async function getUser(){
        const { data: { user } } = await supabase.auth.getUser()
        if(!user) return
        const {data: userAvatar}  = await supabase.from("profiles").select().eq("id", user?.id)
        if(!userAvatar || userAvatar.length===0){
            return
        }
        const avatarURL = userAvatar[0].avatar_url
        console.log(avatarURL)
        setURL(avatarURL)
        return
    }

    useEffect(()=>{
        getUser();
    }, []);

    const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async(event) => {
        
        const { data: { user } } = await supabase.auth.getUser()

        if(!user) {
        redirect('/login')
        }
      
        console.log(user)

        if(!event.target.files || event.target.files.length === 0){
            throw new Error('You must select an image to upload.')
        }

        

        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${user?.id}-${Math.random()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)

        if(uploadError){
            throw uploadError
        }

        console.log('upload succesful')
        const imageURL = `https://ujjrahctcfbuydtpemhr.supabase.co/storage/v1/object/public/images/${filePath}`
        console.log(imageURL)
        const {error} = await supabase.from("profiles").upsert({
            id: user.id as string,
            avatar_url: imageURL as string
        })

        if(error){
            throw(error)
        }

        console.log("Success")
        setURL(imageURL)
    }

    return(
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-col h-96 w-8/12 items-center justify-between bg-gray-900 p-4 border border-white rounded-md">
            <h1> Share your picture here</h1>
            <div className="w-8/12 rounded-sm bg-gray-700 bg-cover h-4/6 border border-white" style={{backgroundImage: avatar ? `url(${avatar})`: 'none'}}>
                
            </div>
            <label htmlFor="imgUpload" className="bg-blue-700 p-2 rounded-md hover:cursor-pointer hover:bg-blue-600">Chose your file</label>
            <input id="imgUpload" name="img" className="w-0 h-0 opacity-0 overflow-hidden absolute -z-10" type="file" accept="image/*" onChange={uploadImage}/>
            </div>
        </div>
    )
}