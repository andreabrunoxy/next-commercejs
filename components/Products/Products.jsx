import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Product from './Product/Product';
import { commerce } from '../../lib/commerce';

const Products = ({ products, searchValue }) => {
  const styles = {
    grid: {
      display: 'flex',
      marginTop: '3rem',
      padding: '2rem'
    }
  };

  const [queryProducts, setQueryProducts] = useState(products);

  const searchProduct = async () => {
    const { data: filteredProducts } = await commerce.products.list({
      query: searchValue
    });
    setQueryProducts(filteredProducts);
  };
  console.log(queryProducts);

  const allProducts = async () => {
    const { data: products } = await commerce.products.list();
    setQueryProducts(products);
  };

  useEffect(() => {
    searchProduct();
    if (searchValue == '') {
      allProducts();
    }
  }, [searchValue]);

  if (!products) return null;

  return (
    <div>
      {typeof queryProducts == 'undefined' && (
        <Grid sx={styles.grid} container justifyContent="center" spacing={4}>
          <Typography variant="h5" color="initial">
            No results found.
          </Typography>
        </Grid>
      )}
      {queryProducts && typeof queryProducts !== undefined && (
        <Grid sx={styles.grid} container justifyContent="center" spacing={4}>
          {queryProducts.map(queryProduct => (
            <Grid item key={queryProduct.id} xs={12} sm={6} md={4} lg={3}>
              <Product queryProduct={queryProduct} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Products;
