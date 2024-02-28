import Main from "./main"

export async function generateStaticParams() {
    const customers = [
        {
            id: "728ed52f",
        },
    ]

    return customers.map((customer) => ({
        customer: customer.id,
    }))
}

export default function Page({ params }: { params: { customerId: string } }) {
    const { customerId } = params;
    return <Main customerId={customerId} />
}