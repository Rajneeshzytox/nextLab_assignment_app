import {useSelector} from "react-redux"

// ui
import { TypoP } from "../../components/ui/Typo" 

// component
import Not_Found_404 from "../../components/utils/Not_Found_404"

export default function Profile(){
    // profile data
    const profile = useSelector(s=>s.profile)


    // if err or loading..
    if(profile.isLoad){
        return <TypoP>Loading...</TypoP>
    }
    if(profile.isError){
        return <Not_Found_404 title={"Something Went Wrong While showing Profile"} />
    }

    return (
        <>
            {profile.data.username}
        </>
    )
}