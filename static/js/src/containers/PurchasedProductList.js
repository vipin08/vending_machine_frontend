import React, { PropTypes } from 'react';
import PurchasedProductListItem from '../components/PurchasedProductListItem';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { refundProduct } from '../actions';

const ProductList = (
	({ products, onProductRefundClick }) => (
		<section className="row">
			{map(products, (product, index) => (
				<div key={index} className="col-xs-12 text-center">
					<PurchasedProductListItem product={product} onClick={onProductRefundClick}/>
				</div>
			))}
		</section>
	)
);

ProductList.propTypes = {
	products: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired
	}).isRequired),
	onProductRefundClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	products: state.purchasedProducts.map(id => state.products.data[id]),
});

const mapDispatchToProps = dispatch => ({
	onProductRefundClick: id =>  dispatch(refundProduct(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductList);
