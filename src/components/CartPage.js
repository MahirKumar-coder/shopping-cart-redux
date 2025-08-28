import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import { addToCart, getCartTotal } from '../features/cartSlice';

export default function ShoppingCart() {
  const dispatch = useDispatch();

  // Redux se cart items lo
  const cart = useSelector(state => state.allCart.cart);
  const items = useSelector(state => state.allCart.items);

  // Cart total calculate karo
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Quantity increase function
  const increaseQty = (item) => {
    dispatch(addToCart({ ...item, quantity: (item.quantity || 1) + 1 }));
    dispatch(getCartTotal()); // Optional, agar slice ki logic mein nahi hai
  };


  // Quantity decrease function
  const decreaseQty = (item) => {
    if ((item.quantity || 1) > 1) {
      dispatch(addToCart({ ...item, quantity: item.quantity - 1 }));
    }
  };

  return (
    <MDBContainer className="my-4">
      <h2 className="mb-4 text-white">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className='text-white'>Your cart is empty.</p>
      ) : (
        <>
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {cart.map(item => (
              <MDBCol key={item.id}>
                <MDBCard>
                  <MDBCardImage src={item.image} position="top" alt={item.title} />
                  <MDBCardBody>
                    <MDBCardTitle>{item.title}</MDBCardTitle>
                    <MDBCardText>Price: ${item.price.toFixed(2)}</MDBCardText>
                    <div className="d-flex align-items-center mt-2">
                      <MDBBtn color="danger" size="sm" onClick={() => decreaseQty(item)}>-</MDBBtn>
                      <span className="mx-3">{item.quantity || 1}</span>
                      <MDBBtn color="success" size="sm" onClick={() => increaseQty(item)}>+</MDBBtn>
                    </div>
                    <MDBCardText className="mt-2">
                      Total: ${((item.price) * (item.quantity || 1)).toFixed(2)}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>

          <h4 className="mt-4 text-white">Total Price: ${totalPrice.toFixed(2)}</h4>
          <MDBBtn color="primary" className="mt-3">Proceed to Checkout</MDBBtn>
        </>
      )}
    </MDBContainer>
  );
}
