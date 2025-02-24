import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../states/userInfo_slice";
// ui
import { TypoP, TypoH1, TypoSmall } from "../../components/ui/Typo";

// component
import Not_Found_404 from "../../components/utils/Not_Found_404";

// icon
import {HistoryIcon, RefreshCwIcon} from "lucide-react"

// Link
import {Link} from "react-router-dom"

export default function Profile() {
  const dispatch = useDispatch()
  // profile data
  const profile = useSelector((s) => s.profile);

  // if err or loading..
  if (profile.isLoad) {
    return <TypoP>Loading...</TypoP>;
  }
  if (profile.isError) {
    return (
      <Not_Found_404 title={"Something Went Wrong While showing Profile"} />
    );
  }

  const DetailCard = ({ title, content }) => {
    return (
      <>
        <div className="flex items-center gap-1">
          <TypoSmall className="mr-4">{title}</TypoSmall>

          {content}
        </div>
      </>
    );
  };

  const user = profile.data;
  return (
    <>
      <TypoH1>Profile</TypoH1>
      {/* details box */}
      <div className="w-full p-6 bg-slate-200 rounded-md">

        {/* Name */}
        <DetailCard
          title={"Name"}
          content={
            <>
              <TypoP className="capitalize">{user.first_name }</TypoP>
              <TypoP className="capitalize">{user.last_name}</TypoP>
            </>
          }
        />

        {/* Email */}
        <DetailCard
          title={"Email"}
          content={
            <>
              <a target="_blank" href={`mailto:${user.email}`} className="hover:underline cursor-pointer">{user.email}</a>
            </>
          }
        />
        {/* Username */}
        <DetailCard
          title={"Username"}
          content={
            <>
              <TypoP>{user.username}</TypoP>
            </>
          }
        />
        {/* Role */}
        <DetailCard
          title={"Role"}
          content={
            <>
              <TypoP>{user.role}</TypoP>
            </>
          }
        />
        {/* Points */}
        <DetailCard
          title={"Points"}
          content={
            <>
              <TypoP className="mr-1">{user.points}</TypoP>
              <button className="hover:rotate-45 transition-all duration-300 mr-4"
                onClick={()=>dispatch(fetchUserProfile())}
              >
                <RefreshCwIcon className="w-4 text-slate-600"/>
              </button>
              <Link to="/history" className="hover:underline  text-slate-700 text-sm flex items-center gap-1">    
                <HistoryIcon className="w-4"/>History
              </Link>
            </>
          }
        />
      </div>
    </>
  );
}
