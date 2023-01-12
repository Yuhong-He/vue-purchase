export default {
	namespaced: true,
	state: {
		title: 'Add',
		productData: {}
	},
	mutations: {
		changeTitle(state, payload) {
			state.title = payload;
		},
		changeProducts(state, payload) {
			state.productData = payload;
		}
	}
}