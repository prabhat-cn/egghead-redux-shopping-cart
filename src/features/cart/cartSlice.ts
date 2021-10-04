import {createSlice, createSelector, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'

export interface CartState {
    // {[productID: type]: value}
    items: {[productID: string]: number}
}

const initialState: CartState = {
    items: {}
}

const cartSlice = createSlice({
    // key
    name: "cart",
    initialState,
    reducers: {
    // Actions here
    addToCart(state, action: PayloadAction<string>){
        const id = action.payload;
        // state.items[id] = 1;
        //  more than 1
        if(state.items[id]) {
            state.items[id]++;
        }else {
            state.items[id] = 1;
        }
    },
    removeFromCart(state, action: PayloadAction<string>){
        delete state.items[action.payload];
    }
    }
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;

// extra Operations
export function getNumItems(state: RootState) {
    console.log('Calling NumItems');
    
    let numItems = 0;
    for(let id in state.cart.items){
        numItems += state.cart.items[id];
    }
    return numItems;
}

// Memorize cart items
export const getMemorizedNumItems = createSelector(
    // two functions
    (state: RootState) => state.cart.items,
    (items) => {
        console.log('Calling Memorized NumItems');
        let numItems = 0;
        for(let id in items){
            numItems += items[id];
        }
        return numItems;
    }
)

// export const getTotalPrice = createSelector<RootState, any, any, string>(
//     // 3 Fun
//     (state) => state.cart.items,
//     (state) => state.products.products,
//     (items, products) => {
//         let total = 0;
//         for(let id in items){
//             total += products[id].price * items[id];
//         }
//         return total.toFixed(2);
//     }

// )

export const getTotalPrice = createSelector(
    // 3 Fun
    (state: RootState) => state.cart.items,
    (state: RootState) => state.products.products,
    (items, products) => {
        let total = 0;
        for(let id in items){
            total += products[id].price * items[id];
        }
        return total.toFixed(2);
    }

)