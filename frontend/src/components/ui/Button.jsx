import { TypoP } from "./Typo";

const Button = ({children, theme}) => {

    return (
        <>
        <div className={`bg-slate-800 px-4 py-1 my-4  rounded-md text-slate-100 w-fit`}>
            <TypoP>
                {children}
            </TypoP>
        </div>
        </>
    )
}

export default Button;