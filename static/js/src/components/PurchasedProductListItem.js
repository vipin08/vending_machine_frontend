import React, { PropTypes } from 'react';

const PurchasedProductListItem = (

	({ product, onClick }) => (
		<div className={`panel panel-default product_${product.id}`}>
			<div className="panel-body">
				<img src={product.image} className="img-rounded img-responsive center-block" />
				<div className="panel-footer">
					{
						product.is_refundable == 0 ?
						<label className="btn-sm text-danger">Purchased</label> :
						product.loading ?
						<label className="btn-sm text-danger">Refunded</label> :
						<button className="btn btn-primary" onClick={() => onClick(product.id)}>Refund</button> 

					}
				</div>			
			</div>
		</div>
	)
);

PurchasedProductListItem.propTypes = {
	product: PropTypes.shape({
		image: PropTypes.string.isRequired
	}).isRequired,
	onClick: PropTypes.func.isRequired
};



export default PurchasedProductListItem;
