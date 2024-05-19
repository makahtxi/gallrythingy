'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"



export default function Page(){

    const supabase = createClient()
    const [avatar, setURL] = useState<string> ("")
    const [user, setUser] = useState("")

    async function getUser(){
        const { data: { user } } = await supabase.auth.getUser()
        if(!user) return
        const {data: userProfile}  = await supabase.from("profiles").select().eq("id", user?.id)
        if(!userProfile || userProfile.length===0){
            return
        }
        console.log(`User is: ${userProfile}`)
        const avatarURL = userProfile[0].avatar_url
        const username = userProfile[0].username
        console.log(avatarURL)
        console.log(username)
        setURL(avatarURL)
        setUser(username)
        return
    }

    useEffect(() => {
        (async () => {
            await getUser()
        })();
    }, [])

    const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async(event) => {
        const { data: { user } } = await supabase.auth.getUser()
        if(!user) {
        redirect('/login')
        }
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

    const updateUsername = async (formData: FormData) =>{
        const { data: { user } } = await supabase.auth.getUser();
        if(!user) return
        const NewUsername = formData.get("username");
        const { error } = await supabase.from("profiles").upsert({
            id: user.id as string,
            username: NewUsername as string
        })
        if(error){
            throw(error)
        }
        alert(`Username successfully updated to ${NewUsername}`)
    }

   async function signOut(){
        console.log("Sign Out")
        await supabase.auth.signOut()
    }
    return(
        <div className="flex justify-around items-center w-full h-screen">
            <div className="flex flex-col h-full w-10/12 items-center justify-between bg-gray-900 p-4 border border-white rounded-md">
                <h1> Account Information</h1>
                <form>
                <input type="text" name="username" defaultValue={user} className="bg-black"></input>
                    <button type="submit"  formAction={updateUsername} className="bg-blue-700 p-2 rounded-md hover:cursor-pointer hover:bg-blue-600">Update</button>
                </form>
                <a onClick={signOut} className="bg-blue-700 p-2 rounded-md hover:cursor-pointer hover:bg-blue-600"> Sign Out </a>
                <h1> Share your picture here</h1>
                <div className="w-6/12 aspect-square rounded-sm bg-gray-700 bg-cover  border border-white" style={{backgroundImage: avatar ? `url(${avatar})`: 'none'}}>
                </div>
                <label htmlFor="imgUpload" className="bg-blue-700 p-2 rounded-md hover:cursor-pointer hover:bg-blue-600">Chose your file</label>
                <input id="imgUpload" name="img" className="w-0 h-0 opacity-0 overflow-hidden absolute -z-10" type="file" accept="image/*" onChange={uploadImage}/>
            </div>
        </div>
    )
}