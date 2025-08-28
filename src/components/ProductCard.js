import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

export default function App() {

    const items = useSelector((state) => state.allCart.items);

    const dispatch = useDispatch();

    return (
        <div className='m-3'>
            <MDBContainer>
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <MDBCol key = {item.id} size="md" className='d-flex justify-content-center'>
                                <MDBCard>
                                    <MDBCardImage src={item.image} position='top' alt='...' />
                                    <MDBCardBody>
                                        <MDBCardTitle>{item.title}</MDBCardTitle>
                                        <MDBCardText>
                                            {item.price}
                                        </MDBCardText>
                                        <MDBBtn onClick={ () => dispatch(addToCart(item))}>Add to Cart</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ))
                    ) : (
                        <p>No items to display</p>
                    )}
                </MDBRow>
            </MDBContainer>
        </div>
    );
}