import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import client from '../src/components/ApolloClient';
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import HeroCarousel from "../src/components/home/hero-carousel";
import { Carousel } from 'react-responsive-carousel';
import React, { useLayoutEffect, useState } from 'react';

export default function Home(props) {

	const { products, productCategories, heroCarousel } = props || {};
	const [width] = useWindowSize();

	console.log(Math.floor((width / 600) * 100))
	const percentage = Math.floor((width / 600) * 100)
	let carouselHeightPercent = 100;
	if (percentage < 100) {
		carouselHeightPercent = percentage;
	}

	const carouselHeight = ((carouselHeightPercent / 100 * 320) - 40) + 'px';

	return (
		<Layout>
			{/*Hero Carousel*/}
			<Carousel interval={5000} autoPlay={true} showStatus={false} showThumbs={false} showArrows={false}>
				<div>
					<img src="https://cf.shopee.co.id/file/c05cf88e7b4167813b894867a4d5a610" style={{ "height": carouselHeight }} />
				</div>
				<div>
					<img src="https://cf.shopee.co.id/file/6cd2599e1baef75ade47ade0eb47c9db" style={{ "height": carouselHeight }} />
				</div>
			</Carousel>
			{/* <HeroCarousel heroCarousel={heroCarousel} /> */}
			{/*Categories*/}
			{/* <div className="product-categories-container container mx-auto my-32 px-4 xl:px-0">
				<h2 className="main-title text-xl mb-5 uppercase"><span className="main-title-inner">Categories</span></h2>
				<ParentCategoriesBlock productCategories={productCategories} />
			</div> */}
			{/*Products*/}
			{/* <div className="products container mx-auto my-32 px-4 xl:px-0">
				<h2 className="products-main-title main-title mb-5 text-xl uppercase"><span className="main-title-inner">Products</span></h2>
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
					{products.length ? (
						products.map(product => <Product key={product.id} product={product} />)
					) : ''}
				</div>
			</div> */}

		</Layout>
	)
};

function useWindowSize() {
	const [size, setSize] = useState([0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size;
}

export async function getStaticProps() {

	const { data } = await client.query({
		query: PRODUCTS_AND_CATEGORIES_QUERY,
	});

	return {
		props: {
			productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : [],
			products: data?.products?.nodes ? data.products.nodes : [],
			heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes ? data.heroCarousel.nodes[0].children.nodes : []
		},
		revalidate: 1
	}

};
