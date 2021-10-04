import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getTotalPrice, removeFromCart } from './cartSlice'
import styles from "./Cart.module.css";

export function Cart() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      {items.length == 0 ? (<><p>No Product Found</p></>) : (<><table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>

          {Object.entries(items).map(([id, quantity]) => (

            <tr key={products[id].id}>
              <td>{products[id].name}</td>
              <td>
                <input type="text" className={styles.input} defaultValue={quantity} />
              </td>
              <td>${products[id].price}</td>
              <td>
                <button aria-label={`Remove ${products[id].name} Magnifying Glass from Shopping Cart`} onClick={() => dispatch(removeFromCart(id))}>
                  X
                </button>
              </td>
            </tr>
          ))}
          {/* <tr>
            <td>Football Cleats</td>
            <td>
              <input type="text" className={styles.input} defaultValue={17} />
            </td>
            <td>$25.99</td>
            <td>
              <button aria-label="Remove Football Cleats from Shopping Cart">
                X
              </button>
            </td>
          </tr> */}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table></>)}

      <form>
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
