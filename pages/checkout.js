import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  Container
} from '@mui/material';
import AddressForm from '../components/CheckoutForm/AddressForm';
import PaymentForm from '../components/CheckoutForm/PaymentForm';
import Confirmation from '../components/CheckoutForm/Confirmation';
import { commerce } from '../lib/commerce';
import { useCartState, useCartDispatch } from '../context/cart';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = () => {
  const styles = {
    toolbar: {
      paddingTop: { xs: '20%', md: '5%' }
    },
    layout: {
      marginTop: '5%',
      width: { xs: '100%', sm: '80%', md: '50%' },
      minHeight: '75vh',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    paper: {
      padding: '1rem',
      background: '#fbfbfb'
    },
    stepper: {
      paddingTop: '1rem',
      paddingBottom: '1rem'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem'
    }
  };

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const cart = useCartState();
  const router = useRouter();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart'
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        router.push('/');
      }
    };
    generateToken();
  }, [cart]);

  const { setCart } = useCartDispatch();

  // const handleUpdateCart = ({ cart }) => setCart(cart);

  // const refreshCart = () => {
  //   commerce.cart.refresh().then(handleUpdateCart);
  // };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const next = data => {
    setShippingData(data);
    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        onCaptureCheckout={handleCaptureCheckout}
      />
    );

  return (
    <>
      <Container sx={styles.toolbar} />
      <Container sx={styles.layout}>
        <Paper sx={styles.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={styles.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation order={order} errorMessage={errorMessage} />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Checkout;
