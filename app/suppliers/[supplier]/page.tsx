import Main from "./main"

export async function generateStaticParams() {
    const suppliers = [
        {
            id: "728ed52f",
        },
    ]

    return suppliers.map((supplier) => ({
        supplier: supplier.id,
    }))
}

export default function Page({ params }: { params: { supplierId: string } }) {
    const { supplierId } = params
    return <Main supplierId={supplierId} />
}