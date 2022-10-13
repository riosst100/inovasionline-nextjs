import Layout from "../src/components/Layout";
import CheckoutForm from "../src/components/checkout/CheckoutForm";
import GET_COUNTRIES from "../src/queries/get-countries";
import client from "../src/components/ApolloClient";

const Checkout = ({ data }) => (
	<Layout title="Checkout" menuTitle="Checkout" noIndex={true}>
		<div className="checkout container mx-auto my-32 px-4 xl:px-0">
			<CheckoutForm countriesData={data?.wooCountries ?? {}} />
		</div>
	</Layout>
);

export default Checkout;

export async function getStaticProps() {
	const { data } = await client.query({
		query: GET_COUNTRIES
	});

	return {
		props: {
			data: data || {}
		},
		revalidate: 1
	};

}
