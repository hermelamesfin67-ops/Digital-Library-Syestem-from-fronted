import BookDetails from "@/features/book/details"


type props = {
    params: Promise<{ slug: string }>
}
async function page({ params }: props) {
    const id = (await params).slug
    return (
        <BookDetails id={id}/>
    )
}

export default page