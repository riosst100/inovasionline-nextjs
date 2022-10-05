import { isEmpty } from "lodash";

const Price = ({ regularPrice = 0, salesPrice }) => {

    if (isEmpty(salesPrice)) {
        return null;
    }

    /**
     * Get discount percent.
     *
     * @param {String} regularPrice
     * @param {String} salesPrice
     */
    const discountPercent = (regularPrice, salesPrice) => {
        if (isEmpty(regularPrice) || isEmpty(salesPrice)) {
            return null;
        }

        const formattedRegularPrice = parseInt(regularPrice?.substring(2));
        const formattedSalesPrice = parseInt(salesPrice?.substring(2));

        const discountPercent = ((formattedRegularPrice - formattedSalesPrice) / formattedRegularPrice) * 100;

        return {
            discountPercent: formattedSalesPrice !== formattedRegularPrice ? `${discountPercent.toFixed()}% OFF` : null,
            strikeThroughClass: formattedSalesPrice < formattedRegularPrice ? 'product-regular-price mr-2 line-through text-sm text-gray-600 font-normal' : ''
        }
    }

    const productMeta = discountPercent(regularPrice, salesPrice);

    return (
        <h6 className="product-price mr-3 mb-5">
            {/* Regular price */}
            {productMeta?.discountPercent ? <span className="product-price mr-2">{salesPrice}</span> : null}

            <div>
                {/* Discounted price */}
                <span className={productMeta?.strikeThroughClass}>{regularPrice}</span>

                {/* Discount percent */}
                <span className="product-discount font-bold text-sm font-normal">{productMeta?.discountPercent}</span>
            </div>
        </h6>
    )
}

export default Price
