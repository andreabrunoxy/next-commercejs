import { useState, useEffect } from 'react';
import Head from 'next/head';
import Products from '../components/Products/Products';
import { commerce } from '../lib/commerce';
import {
  Container,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import { Search } from '@mui/icons-material';

export async function getStaticProps() {
  const merchant = await commerce.merchants.about();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      merchant,
      products
    }
  };
}

export default function Home({ merchant, products }) {
  const styles = {
    mainTitle: {
      fontWeight: 'bold',
      marginTop: { xs: '20%', sm: '15%', md: '10%' },
      marginLeft: '5%'
    },
    hero: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '-50px'
    }
  };

  const [searchValue, setSearchValue] = useState('');
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

  return (
    <div sx={styles.container}>
      <Head>
        <title>My e-Shop</title>
        <meta name="description" content="E-commerce with Commerce.js and Stripe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={styles.hero}>
        <Typography variant="h1" sx={styles.mainTitle}>
          My e-Shop
        </Typography>
        <Typography variant="h2">Products for everyone</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ m: 1, width: '25ch', mt: '1rem' }} variant="outlined">
            <InputLabel htmlFor="outlined-basic">Search Product</InputLabel>
            <OutlinedInput
              id="outlined-basic"
              endAdornment={
                <InputAdornment position="end">
                  <Search sx={{ ml: 1 }} />
                </InputAdornment>
              }
              label="Search product"
              onChange={e => setSearchValue(e.target.value)}
            />
          </FormControl>
        </Box>
      </Container>
      <Products products={products} queryProducts={queryProducts} />
    </div>
  );
}
