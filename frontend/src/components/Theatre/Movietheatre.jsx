import React, { useEffect, useState } from 'react';
import { getTheatresByMovie } from '../../api-helpers/api-helpers';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom'

const Movietheatre = ({ selectedMovie }) => {
    const navigate=  useNavigate()
  const [theatres, setTheatres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    
    const fetchTheatres = async () => {
      try {
        const theatresResponse = await getTheatresByMovie(selectedMovie);
      console.log("theatreresposne:",theatresResponse);
        setTheatres(theatresResponse.theatreData);
      } catch (error) {
        console.error('Failed to fetch theatres:', error);
      }
    };

    fetchTheatres();
  }, [selectedMovie]);

 
  const filteredTheatres = theatres.filter(theatre =>
    theatre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };
  const handleButton = (id) => {
   
    navigate(`/movieseats/${id}`);
  };
  return (
    <div>
      <TextField
        label="Search Theatre"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginLeft:"800px",width:"300px"}}
      />
      {filteredTheatres.length > 0 ? (
        <div>
          {filteredTheatres.map(theatre => (
            <Button
              key={theatre.id}
              variant="outlined"
              color="secondary"
              sx={{
                margin: '20px',
                fontSize: '1.2rem',
                color: 'golden',
                borderColor: 'golden',
                '&:hover': {
                  backgroundColor: 'golden',
                  color: 'black',
                },
              }}
              onClick={() => handleButton(theatre.id)}
            >
              {theatre.name}
            </Button>
          ))}
        </div>
      ) : (
        <h2 style={{color:"red" ,marginLeft:"600px"}}> <b>No theatres found for This Movie</b> </h2>
      )}
    </div>
  );
};

export default Movietheatre;
