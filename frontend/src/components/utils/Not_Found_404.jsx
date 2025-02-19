export default function Not_Found_404({title}){
    title = title || "Page Not Found"
    return (
        <>
            <main className="404_Not_Found_container size-full grid place-content-center">
                <h2>
                    404 | {title}
                </h2>
            </main>
        </>
    )
}