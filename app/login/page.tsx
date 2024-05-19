


import { login, signup } from "./actions"

export default function Page() {

    return(
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex justify-center items-center bg-gray-950 w-8/12 h-2/6 p-4 rounded-lg border border-white">
            <form className="flex flex-col gap-4 w-8/12">
                <div className="flex flex-col">
                    <label  className="text-sm" htmlFor="username">Username</label>
                    <input  className="bg-gray-900 rounded-sm p-1 border border-white" type="text" name="username" placeholder="email@email.com"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="password">Password</label>
                    <input className="bg-gray-900 rounded-sm p-1 border border-white" type="password" name="password" placeholder="*********"/>
                </div>
                <div className="flex justify-start gap-4">
                    <button className="bg-blue-700 py-2 px-4 rounded-md" formAction={login}>Login</button>
                    <button className="bg-blue-400 py-2 px-4 rounded-md" formAction={signup}>Register</button>
                </div>
            </form>
         </div>
        </div>
    )
}