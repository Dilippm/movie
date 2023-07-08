import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const MovieItems = ({ title  , language, postedUrl, id }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/viewmovie/${id}`);
  };
    return (
      <Card className='poster-box' sx={{ width: 300, height: 370, borderRadius: 5, ":hover": { boxShadow: "10px 10px 20px #ccc" }, margin: 5, backgroundImage: `url(${postedUrl})`, backgroundSize: 'cover',border:"3px solid white"  }}>
        <CardActionArea>
          <CardContent sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10,marginTop: '200px' }}>
            <div>
              <Typography  variant="h5" component="div" color="#ff9800">
               <b> {title}</b>
              </Typography>
           
            </div>
            <Typography variant="body2" color="#ff9800">
                <b>{language}</b>
              
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
    onClick={handleButtonClick}
  >
    Book Ticket
  </Button>
</CardContent>

      </Card>
    );
  }
  
  export default MovieItems;
  
  

  
  
  


