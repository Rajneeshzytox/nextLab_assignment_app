import {useSelector} from "react-redux"

export default function Admin(){
    const profile = useSelector(s=>s.profile)

     return (
        <>
            <main className="Admin_container size-full grid place-content-center">
                

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