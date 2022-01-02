import React from 'react';
import { Typography, Button, Divider, Container } from '@mui/material';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  checkoutToken,
  backStep,
  nextStep,
  onCaptureCheckout,
  shippingData
}) => {
  const styles = {
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem'
    }
  };

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });
    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: {
          name: 'International',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <Container sx={styles.buttonContainer}>
                <Button type="button" onClick={backStep}>
                  Prev
                </Button>
                <Button type="submit" variant="contained" disabled={!stripe}>
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </Container>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;