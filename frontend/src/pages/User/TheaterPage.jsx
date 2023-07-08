import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, Grid,Button } from '@mui/material';
import Header from '../../components/Header';
import { getTheaters } from "../../api-helpers/api-helpers"
import RatingComponent from '../../components/Rating/Rating';
import AddRating from '../../components/Rating/AddRating';
import GetRatings from '../../components/Rating/GetRatings';
const TheaterPage = () => {
    const [theaters, setTheaters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const theatersPerPage = 2;

    useEffect(() => {
        const fetchtheaterDetails = async () => {
            try {
                const theaterDetails = await getTheaters();

                setTheaters(theaterDetails.theatre);
               
            } catch (error) {
                console.error('Failed to fetch theater details:', error);
            }
        };

        fetchtheaterDetails();
    }, []);

    const indexOfLastTheater = currentPage * theatersPerPage;
    const indexOfFirstTheater = indexOfLastTheater - theatersPerPage;
    const currentTheaters = theaters.slice(indexOfFirstTheater, indexOfLastTheater);
  
    const totalTheaterPages = Math.ceil(theaters.length / theatersPerPage);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
        <>
            <Header />
            <Container maxWidth="80%">
            <Typography variant="h4" marginTop={8} padding={2} textAlign="center" bgcolor="#900C3F" color="white" marginBottom={2}>
                    <b> Theaters</b>
                </Typography>
                {currentTheaters.map((theater) => (
                    <Card key={theater._id} sx={{ margin: 'auto', background: 'linear-gradient(45deg, black, red)', border: 0, borderRadius: 3, boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .9)', color: 'white', marginBottom: '20px', width: "80vw", height: "200px" }}>
                        <CardContent>
                            <Grid container spacing={4} direction="row">
                                <Grid item xs={3}>
                                    <Typography variant="h6" component="h2" sx={{ fontSize: "30px" }}>
                                        <b>Theater:</b>   {theater.name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "30px" }} mt={2}>
                                        <b>Movie:</b>  {theater.movies}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }}>
                                        <b>No. of Seats:</b>  {theater.seats}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }} mt={2}>
                                        <b>Price:</b>  ₹{theater.price}/-
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }}>
                                        <b>Ratings:</b> <RatingComponent value={theater.totalRating} />
                                    </Typography>
                                
                                </Grid>

                                <Grid item xs={3} sx={{ marginTop:"30px"}}>
                                <AddRating theaterId={theater._id}  />
                                <GetRatings theaterId={theater._id}/>
                            </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
                 {totalTheaterPages > 1 && (
          <Grid container justifyContent="center">
            <Button variant="contained" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} style={{marginBottom:"30px", color:"white", backgroundColor:currentPage ===  1? " " :"blue" }} >
              Previous
            </Button>
            {Array.from({ length: totalTheaterPages }, (_, index) => (
              <Button
              variant="outlined"
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' , backgroundColor: currentPage === index + 1 ? "blue":" ",color:"white", marginLeft:"10px", marginBottom:"30px" }}
              >
                {index + 1}
              </Button>
            ))}
            <Button variant="contained" disabled={currentPage === totalTheaterPages} onClick={() => handlePageChange(currentPage + 1)} style={{marginBottom:"30px", color:"white", backgroundColor:currentPage ===  totalTheaterPages? " " :"blue", marginLeft:"10px" }}>
              Next
            </Button>
          </Grid>
        )}
            </Container>
        </>
    );
}

export default TheaterPage
