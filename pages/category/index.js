import Layout from "../../src/components/Layout";
import client from '../../src/components/ApolloClient';
import ParentCategoriesBlock from "../../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../../src/queries/product-and-categories";
import React, { useState } from 'react';

export default function CategoryList(props) {
    const { productCategories } = props || {};

    return (
        <Layout title="Layanan" menuTitle="Layanan">
            <ParentCategoriesBlock categoryView={true} productCategories={productCategories} style={
                {
                    "paddingBottom":"20px"
                }
            }/>
        </Layout>
    )
};

export async function getStaticProps({ locale }) {

    const { data } = await client.query({
        query: PRODUCTS_AND_CATEGORIES_QUERY,
    });

    return {
        props: {
            productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : []
        },
        revalidate: 1
    }

};
