import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { getuserBanners } from '../../api-helpers/api-helpers';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = () => {
    getuserBanners()
      .then((data) => {
        setBanners(data.response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
  className="poster-box"
  width="100%"
  height="500px"
  padding={2}
  display="flex"
  alignItems="center"
  justifyContent="center"
  overflowX="hidden"
>
  {banners.length > 0 && (
    <Carousel
      showThumbs={false}
      infiniteLoop
      interval={20000} 
      autoPlay
      stopOnHover={false}
    >
      {banners.map((banner) => (
        <div key={banner.id}>
          <img
            src={banner.postedUrl}
            alt={banner.title}
            style={{ width: '100vw', height: '650px', objectFit: 'fill', marginRight:"15px",marginTop:"20px" }}
          />
        </div>
      ))}
    </Carousel>
  )}
</Box>

  );
};

export default Banner;
