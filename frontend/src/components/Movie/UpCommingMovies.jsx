import React, { useState, useEffect } from 'react';
import { getAllUpcommingMovies } from '../../api-helpers/api-helpers';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'; 
import './stylesheet.css';

const UpCommingMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (movieId) => {
    navigate(`/viewmovie/${movieId}`);
  };

  useEffect(() => {
    getAllUpcommingMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // <Carousel
    //   showStatus={false}
    //   showArrows={true} 
    //   emulateTouch
    //   infiniteLoop
    //   showIndicators={false}
    //   renderThumbs={() => {}}
    //   renderIndicator={() => {}}
    //   renderStatus={() => {}}
    //   renderArrowPrev={() => {}}
    //   renderArrowNext={() => {}}
    //   centerMode
    //   centerSlidePercentage={50}
    //   selectedItem={1}
    //   swipeable
    //   autoPlay
    //   interval={2000}
    //   stopOnHover
    //   transitionTime={1000}
    //   style={{ width: '100%', height: '100%' }}
    // >
    //   {movies.map((movie) => (
    //     <div key={movie._id}>
    //       <Card
    //         className='poster-box'
    //         sx={{
    //           width: 300,
    //           height: 370,
    //           borderRadius: 5,
    //           boxShadow: 'none',
    //           marginTop: "20px",
    //           backgroundImage: `url(${movie.postedUrl})`,
    //           backgroundSize: 'cover',
    //           border: '3px solid white',
    //         }}
    //       >
    //         <CardActionArea>
    //           <CardContent
    //             sx={{
    //               position: 'absolute',
    //               height: '100%',
    //               display: 'flex',
    //               flexDirection: 'column',
    //               justifyContent: 'space-between',
    //               zIndex: 10,
    //               marginTop: '200px',
    //             }}
    //           >
    //             <div>
    //               <Typography variant="h5" component="div" color="#ff9800">
    //                 <b>{movie.title}</b>
    //               </Typography>
    //             </div>
    //             <Typography variant="body2" color="#ff9800">
    //               <b>{movie.language}</b>
    //             </Typography>
    //           </CardContent>
    //         </CardActionArea>
    //         <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
    //           <Button
    //             variant="contained"
    //             sx={{
    //               marginTop: "300px",
    //               '&:hover': {
    //                 backgroundColor: '#e91e63',
    //               },
    //             }}
    //             onClick={() => handleButtonClick(movie._id)}
    //           >
    //             Show Details
    //           </Button>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   ))}
    // </Carousel>
    <>
     {movies.slice(0, 3).map((movie, index) => (
    <Card className='poster-box' sx={{ width: 300, height: 370, borderRadius: 5, ":hover": { boxShadow: "10px 10px 20px #ccc" }, margin: 5, backgroundImage: `url(${movie.postedUrl})`, backgroundSize: 'cover',border:"3px solid white"  }}>
        <CardActionArea>
          <CardContent sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10,marginTop: '200px' }}>
            <div>
              <Typography  variant="h5" component="div" color="#ff9800">
               <b> {movie.title}</b>
              </Typography>
           
            </div>
            <Typography variant="body2" color="#ff9800">
                <b>{movie.language}</b>
              
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
  <Button
    variant="contained"
    sx={{
      "&:hover": {
        backgroundColor: '#e91e63' 
      }
    }}
    onClick={()=>handleButtonClick(movie._id)}
  >
    Show Details
  </Button>
</CardContent>

      </Card>
         ))}
    </>
    
  );
};

export default UpCommingMovies;
