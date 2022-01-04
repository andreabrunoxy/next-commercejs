import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { Div } from '../../styled';
import { commerce } from '../../../lib/commerce';
import { useCartDispatch } from '../../../context/cart';

const Product = ({ product, queryProduct }) => {
  const { setCart } = useCartDispatch();

  const addToCart = () => commerce.cart.add(product.id).then(({ cart }) => setCart(cart));
  const addToCartQuery = () =>
    commerce.cart.add(queryProduct.id).then(({ cart }) => setCart(cart));

  const styles = {
    card: {
      margin: { xs: '0', md: '0' }
    },
    action: {
      justifyContent: 'flex-end'
    }
  };

  return (
    <>
      {!queryProduct && (
        <Card sx={styles.card}>
          <CardMedia
            component="img"
            image={product.image.url}
            title={product.name}
            height="300"
            alt={product.name}
          />
          <CardContent>
            <Div>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {product.price.formatted_with_symbol}
              </Typography>
            </Div>
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              style={{ color: 'gray' }}
            />
          </CardContent>
          <CardActions sx={styles.action} disableSpacing>
            <IconButton aria-label="Add to Cart" onClick={addToCart}>
              <AddShoppingCart />
            </IconButton>
          </CardActions>
        </Card>
      )}
      {queryProduct && (
        <Card sx={styles.card}>
          <CardMedia
            component="img"
            image={queryProduct.image.url}
            title={queryProduct.name}
            height="300"
            alt={queryProduct.name}
          />
          <CardContent>
            <Div>
              <Typography variant="h5" gutterBottom>
                {queryProduct.name}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {queryProduct.price.formatted_with_symbol}
              </Typography>
            </Div>
            <div
              dangerouslySetInnerHTML={{ __html: queryProduct.description }}
              style={{ color: 'gray' }}
            />
          </CardContent>
          <CardActions sx={styles.action} disableSpacing>
            <IconButton aria-label="Add to Cart" onClick={addToCartQuery}>
              <AddShoppingCart />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default Product;
