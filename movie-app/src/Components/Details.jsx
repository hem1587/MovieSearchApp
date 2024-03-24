import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import noImage from '../images/noimage.png';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'; 

function Details({ match }) {
    const [details, setDetails] = useState(null);
    const { id } = useParams();
    const fetchDetails = async () => {
        try {
            const { data } = await axios.get(`https://www.omdbapi.com/?apikey=3fd90683&i=${id}`);
            setDetails(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);


    return (
        <Box className="main-container">
            <Box className="header">
               
            </Box>
            <Box className="details-container">
                <Flex className="flexBox">
                    <Box className="cover">
                        {details && (
                            <Image src= {details.Poster} alt="" />
                        )}
                    </Box>
                    <Box className="info" marginLeft="8">
                        <Box className="back-button">
                            <Link to='/'>
                                <Button colorScheme="blue">Back to search</Button>
                            </Link>
                        </Box>
                        <Box className="big-title" marginTop="4">
                            <Text fontWeight="bold">{details && details.Title}</Text>
                        </Box>
                        <Box className="type">
                            <Text>{details && "Type: " + details.Type}</Text>
                        </Box>
                        <Box className="ratings">
                            <Text>{details && "Ratings: " + details.imdbRating}</Text>
                        </Box>
                        <Box className="genre">
                            <Text>{details && "Genre: " + details.Genre}</Text>
                        </Box>
                        <Box className="director">
                            <Text>{details && "Director: " + details.Director}</Text>
                        </Box>
                        <Box className="writer">
                            <Text>{details && "Writer: " + details.Writer}</Text>
                        </Box>
                        <Box className="actor">
                            <Text>{details && "Actors: " + details.Actors}</Text>
                        </Box>
                        <Box className="language">
                            <Text>{details && "Language: " + details.Language}</Text>
                        </Box>
                        <Box className="country">
                            <Text>{details && "Country: " + details.Country}</Text>
                        </Box>
                    </Box>
                </Flex>
                <Box className="plot" marginTop="4">
                    <Text>{details && details.Plot}</Text>
                </Box>
            </Box>
           
        </Box>
    );
}

export default Details;
