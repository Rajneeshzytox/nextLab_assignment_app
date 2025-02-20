import {useSelector} from "react-redux"

export default function Admin(){
    const profile = useSelector(s=>s.profile)

     return (
        <>
            <main className="Admin_container size-full max-md:pt-20 pt-10 px-8 min-h-screen">
                

                <p>
                    {profile.data.role}
                </p>
                <p>
                    {profile.data.username}
                </p>
                

            </main>
        </>
    )
}