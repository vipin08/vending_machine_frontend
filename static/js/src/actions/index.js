import {
	FETCH_PRODUCTS,
	FETCH_PRODUCTS_DONE,
	INCREMENT_BALANCE,
	INCREMENT_BALANCE_DONE,
	DECREMENT_BALANCE,
	BUY_PRODUCT,
	BUY_PRODUCT_DONE,
	REFUND_PRODUCT,
	REFUND_PRODUCT_DONE,
	API_BASE_URL,
	RANDOM_ID
} from '../constants/ActionTypes';
import axios from 'axios';


export const fetchProducts = () => dispatch => {
	dispatch({
		type: FETCH_PRODUCTS
	});	

	axios.get(`${API_BASE_URL}/products`).then(products => {
		// Add some timeout to see loading
		setTimeout(() => {
			dispatch({
				type: FETCH_PRODUCTS_DONE,
				payload: products
			});
		}, 1000);
	});
};

export const incrementBalance = amount => dispatch => {
	dispatch({
		type: INCREMENT_BALANCE,
		payload: amount
	});

	axios.post('api/balance', {
		amount
	}).catch(() => {
		// Add some timeout to see loading
		setTimeout(() => {
			dispatch({
				type: INCREMENT_BALANCE_DONE,
				payload: amount
			});		
		}, 1000);
	});
};

export const decrementBalance = amount => dispatch => {
	dispatch({
		type: DECREMENT_BALANCE,
		payload: amount
	});
};

export const buyProduct = id => (dispatch) => {
	dispatch({
		type: BUY_PRODUCT,
		payload: id
	});
	axios.put(`${API_BASE_URL}/products/${id}/buy`, {user_name: RANDOM_ID}).
	then(product => {
		setTimeout(() => {
			dispatch(decrementBalance(product.data.price));
			dispatch({
				type: BUY_PRODUCT_DONE,
				payload: id
			});
		}, 1000);
		// Add some timeout to see loading
	}).catch(() => {
		// Add some timeout to see loading
		alert('Please try again later');
		setTimeout(() => {
			window.location.href = '/';
		}, 1000);
	});
};


export const refundProduct = id => (dispatch) => {
	dispatch({
		type: REFUND_PRODUCT,
		payload: id
	});
	axios.put(`${API_BASE_URL}/products/${id}/refund`, {user_name: RANDOM_ID}).
	then(product => {
		setTimeout(() => {
			dispatch(incrementBalance(product.data.price));
			// dispatch(decrementBalance(product.data.price));
			dispatch({
				type: REFUND_PRODUCT_DONE,
				payload: id
			});
		}, 1000);
		// Add some timeout to see loading
	}).catch(() => {
		// Add some timeout to see loading
		alert('Please try again later');
		setTimeout(() => {
			window.location.href = '/';
		}, 1000);
	});
};
