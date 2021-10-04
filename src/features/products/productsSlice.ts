import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {Product} from '../../app/api'

export interface ProductsState {
    // {[id: type]: value}
    products: {[id: string]: Product}
}

const initialState: ProductsState = {
    products: {
        // "123": {
        //     name: "Fake Pro"
        // }
    }
}

const productsSlice = createSlice({
    // key
    name: "products",
    initialState,
    reducers: {
    // Actions here
    receivedProducts(state, action: PayloadAction<Product[]>) {
        const products = action.payload;
        products.forEach(product => {
            state.products[product.id] = product;
        })
    }
    }
});

export const {receivedProducts} = productsSlice.actions;
export default productsSlice.reducer;