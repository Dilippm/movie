import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Typography, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './styles/RevenueStyles.css';
import { getAllBookingsAdmin } from '../../api-helpers/api-helpers';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument'; 
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Revenue = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); 

  const tokenExpirationMiddleware = (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admintoken");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminimage");
      localStorage.removeItem("adminname");
      toast.error("Token expired. Redirecting to login page...");
      navigate("/admin/admin");
    } else {
      throw error;
    }
  };
  useEffect(() => {
 
    const fetchBookingDetails = async () => {
      try {
        const response = await getAllBookingsAdmin();
       
        setBookingDetails(response);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        tokenExpirationMiddleware(error);
      }
    };

    fetchBookingDetails();
  }, []);

  useEffect(() => {
    let bookingArray = Object.entries(bookingDetails);
  
    let filteredDetails = bookingArray.filter(([key, revenue]) => {
      const [movie, theater, year, month, day] = key.split('-');
      const bookingDate = new Date(year, month - 1, day);
  
      if (selectedStartDate && selectedEndDate) {
        return bookingDate >= selectedStartDate && bookingDate <= selectedEndDate;
      } else if (selectedStartDate) {
        return bookingDate >= selectedStartDate;
      } else if (selectedEndDate) {
        return bookingDate <= selectedEndDate;
      }
  
      return true;
    });
  
    
    filteredDetails = filteredDetails.filter(([key, revenue]) => {
      const [movie, theater] = key.split('-');
  
      return (
        movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theater.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
    setFilteredDetails(filteredDetails);
  }, [bookingDetails, searchQuery, selectedStartDate, selectedEndDate]);
  

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let bookingArray = Object.entries(bookingDetails);
  const yesterday = dayjs().add(3, 'day');

  const csvData = filteredDetails.map(([key, revenue]) => {
    const [movie, theater, year, month, day] = key.split('-');
    const formattedDate = `${year}-${month}-${day}`;

    return {
      Movie: movie,
      Theater: theater,
      Date: formattedDate,
      Revenue: revenue,
    };
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDetails.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white" marginTop={7}>
        <b>Revenue Report</b>
      </Typography>
      <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginTop: '30px', backgroundColor: 'whitesmoke',marginLeft:"800px",width:"500px" }}

          />
          <br/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            disableFuture
            renderInput={(props) => <TextField {...props} />}
            sx={{ margin: '20px', backgroundColor: 'whitesmoke' }}
          />
          <DatePicker
            label="End Date"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            maxDate={yesterday}
            sx={{ margin: '20px', backgroundColor: 'whitesmoke' }}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>
        
      <div className="table-container">
      
        
        
        <div className="download-buttons" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <CSVLink data={csvData} filename="revenue-report.csv">
            <Button variant="contained" style={{ marginLeft: '10px',marginTop:"30px" }}>Download CSV</Button>
          </CSVLink>
          <PDFDownloadLink document={<PDFDocument filteredDetails={filteredDetails} />} fileName="revenue-report.pdf">
            {({ blob, url, loading, error }) =>
              loading ? (
                <Button variant="contained" disabled>
                  Loading...
                </Button>
              ) : (
                <Button variant="contained" style={{ marginLeft: '10px',marginTop:"30px" }}>Download PDF</Button>
              )
            }
          </PDFDownloadLink>
        </div>
        <Table className="revenue-table">
          <Thead className="table-head">
            <Tr style={{backgroundColor:"black", color:"white"}}>
              <Th>Movie</Th>
              <Th>Theater</Th>
              <Th>Date</Th>
              <Th>Revenue</Th>
            </Tr>
          </Thead>
          <Tbody className="table-body">
            {currentItems.map(([key, revenue]) => {
              const [movie, theater, year, month, day] = key.split('-');
              const formattedDate = `${day}-${month}-${year}`;

              return (
                <Tr key={key}>
                  <Td>{movie}</Td>
                  <Td>{theater}</Td>
                  <Td>{formattedDate}</Td>
                  <Td>₹{revenue}/-</Td>
                </Tr>
              );
            })}
          </Tbody>
          
        </Table>
        <div className="search-pagination">
        <Pagination
            count={Math.ceil(filteredDetails.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            sx={{ margin: '30px', justifyContent: 'center',marginLeft:"900px"}}
          />
          
        </div>
       
      </div>
    </>
  );
};

export default Revenue;
