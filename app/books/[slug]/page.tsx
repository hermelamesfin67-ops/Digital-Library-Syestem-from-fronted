

type props = {
    params: Promise<{ slug: string }>
}
async function page({ params }: props) {
    const id = (await params).slug
    return (
        <div className="h-screen">
            Book {id} Detail
        </div>
    )
}

export default page