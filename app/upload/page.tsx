'use client'
export default function Page(){
    
   const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async(event) => {
        
        if(!event.target.files || event.target.files.length === 0){
            throw new Error('You must select an image to upload.')
        }

        const file = event.target.files[0]
        console.log("Image Received")
        console.log(file)
        return file
    }

    return(
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-col h-96 w-8/12 items-center justify-between bg-gray-900 p-4 border border-white rounded-md">
            <h1> Share your picture here</h1>
            <div className="w-8/12 rounded-sm bg-gray-700 h-4/6 border border-white">
                <img></img>
            </div>
            <label htmlFor="imgUpload" className="bg-blue-700 p-2 rounded-md hover:cursor-pointer hover:bg-blue-600">Chose your file</label>
            <input id="imgUpload" name="img" className="w-0 h-0 opacity-0 overflow-hidden absolute -z-10" type="file" accept="image/*" onChange={uploadImage}/>
            </div>
        </div>
    )
}