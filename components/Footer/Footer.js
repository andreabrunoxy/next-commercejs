import { Box, Typography, IconButton } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '3rem',
          paddingBottom: '3rem'
        }}
      >
        <Typography variant="subtitle2" sx={{ alignSelf: 'center', color: '#bbb' }}>
          @ 2021 - My e-shop - Made by Andrea Bruno
        </Typography>
        <Typography variant="subtitle2" sx={{ alignSelf: 'center', color: '#bbb' }}>
          Terms and conditions | Cookie Policy
        </Typography>
        <Box
          sx={{
            display: 'flex',
            color: '#bbb',
            justifyContent: 'center'
          }}
        >
          <Link href={'#'} passHref>
            <IconButton aria-label="Facebook" color="inherit">
              <FacebookOutlinedIcon />
            </IconButton>
          </Link>
          <Link href={'#'} passHref>
            <IconButton aria-label="Facebook" color="inherit">
              <InstagramIcon />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
