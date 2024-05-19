// import Image from "next/image";
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser()
  console.log(user)
  if(!user) {
    redirect('/login')
  }
  
  const { data: posts} = await supabase.from('profiles').select()



  console.log(posts)

  const PostList = posts ?? []
  return (
    <div className="w-10/12 h-2/3 m-auto flex flex-col justify-center">
    <div className="flex  justify-center w-full h-full bg-red-600 flex-wrap gap-10">
      {PostList.map((post, index: number) =>{
        return (
            <div className="w-5/12" key={index}>
              <p className="w-full text-center">{post.username}</p>
                <div className=" bg-cover bg-center flex justify-center items-center w-12/12 aspect-square"
                     style={{backgroundImage: `url(${post.avatar_url})`}}>
                </div>
            </div>
        )
      })}
    </div>
    <div className="flex w-full justify-center mt-6">
      <Link href={"/upload"}>
      <p className="bg-blue-700 p-4 rounded-md">Change ur cat</p>
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

