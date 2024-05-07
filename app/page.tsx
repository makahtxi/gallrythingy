import Image from "next/image";
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser()

  if(!user) {
    redirect('/login')
  }
  
  const { data: images} = await supabase.from('images').select()


  console.log(images)

  const imageList = images ?? []
  return (
    <div>
    <div className="flex flex-wrap gap-4">
      {imageList.map((image) =>{
        return (
          <div key={image.id} className="flex justify-center items-center w-48 h-48 bg-black">
            <img src={image.url} className="max-w-48 max-h-48"/>
          </div>
        )
      })}
    </div>
    <div className="flex w-full  justify-center">
      <Link href="/upload">
      <p className="bg-blue-700 p-4 rounded-md">Upload ur own cat</p>
      </Link>
    </div>
    </div>
    // <Image
    // src={data.publicUrl}
    // width={400}
    // height={400}
    // alt="Pop"
    // />
  );
}

