import OrderPage from "@/components/admin-components/OrderPage";
import { fetchOrder } from "@/lib/actions/order.actions";

interface Product {
    product: {
        id: string;
        name: string;
        images: string[];
        priceToShow: number;
        params: {
            name: string;
            value: string;
        } []
    },
    amount: number
}
const Page = async ({ params }: { params: { id: string } }) => {
    if(!params.id) return null;

    const order = await fetchOrder(params.id);

    //console.log(order.products);

    return (
        <section className="w-full">
            <OrderPage orderJson={JSON.stringify(order)}/>
        </section>
    )
}

export default Page;