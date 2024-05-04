import Image from "next/image";
import { createClient } from '@/utils/supabase/server'

export default async function Home() {

  const supabase = createClient();

 
  const { data: images } = await supabase.from('images').select()

  console.log(images)
  return (
    <div>
    <input type="file"></input>
    <div className="flex flex-wrap gap-4">
      {[...images, ...images, ...images ].map((image) =>{
        return (
          <div key={image.id} className="flex justify-center items-center w-48 h-48 bg-black">
            <img src={image.url} className="max-w-48 max-h-48"/>
          </div>
        )
      })}
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

