
export function TypoTitle({children, className}){

    return (
        <h1 className={`${className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 mt-4`}>
            {children}
        </h1>
    )
}
export function TypoH1({children, className}){

    return (
        <h1 className={`${className} text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] my-1`}>
            {children}
        </h1>
    )
}

export function TypoH2({children, className}){

    return (
        <h2 className={`${className} scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0`}>
            {children}
        </h2>
    )
}

export function TypoH3({children, className}){

    return (
        <h3 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>
            {children}
        </h3>
    )
}

export function TypoH4({children, className}){

    return (
        <h4 className={`${className} scroll-m-20 text-lg font-semibold tracking-tight`}>
            {children}
        </h4>
    )
}

export function TypoP({children, className}){

    return (
        <p className={`${className} leading-7 [&:not(:first-child)]:mt-6`}>
            {children}
        </p>
    )
}

export function TypoBlockquote({children, className}){

    return (
        <blockquote className={`${className} mt-6 border-l-4 pl-6 italic border-gray-400`}>
            {children}
        </blockquote>
    )
}

export function TypoUl({children, className}){

    return (
        <ul className={`${className} my-6 ml-6 list-disc [&>li]:mt-2`}>
            {children}
        </ul>
    )
}

export function TypoCode({children, className}){

    return (
        <code className={`${className} relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`}>
            {children}
        </code>
    )
}

export function TypoLead({children, className}){

    return (
        <p className={`${className} text-xl text-muted-foreground`}>
            {children}
        </p>
    )
}

export function TypoLarge({children, className}){

    return (
        <div className={`${className} text-lg font-semibold`}>
            {children}
        </div>
    )
}

export function TypoSmall({children, className}){

    return (
        <small className={`${className} text-sm font-medium leading-none`}>
            {children}
        </small>
    )
}

export function TypoDisable({children, className}){

    return (
        <p className={`${className} text-sm text-muted-foreground`}>
            {children}
        </p>
    )
}