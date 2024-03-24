import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import noImage from '../images/noimage.png';
import { Grid, GridItem } from '@chakra-ui/react';
import { FiSearch } from "react-icons/fi";
function Home() {
    const [fetchedData, setfetchedData] = useState(null);
    const [input, setinput] = useState("");
    const [search, setsearch] = useState("man");

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`https://www.omdbapi.com/?apikey=3fd90683&s=${search}`);
            setfetchedData(data.Search);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchData();
    }, [search]);

    const inputHander = (e) => {
        setinput(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setsearch(input);
    };

    return (
        <div className="main-container">
            <div className="header">
                <h4>Movie App</h4>
            </div>
            <div className="search">
                <form onSubmit={submitHandler}>
               
                    <input placeholder="Search here" value={input} onChange={inputHander} type="text"/>
                    <button><FiSearch/></button>
                </form>
            </div>
            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
                {fetchedData &&
                    fetchedData.map((item) => (
                        <GridItem key={item.imdbID}>
                            <div>
                                <div className="poster">
                                    <Link to={`/details/${item.imdbID}`}>
                                        <img src={item.Poster === "N/A" ? noImage : item.Poster} alt="" />
                                    </Link>
                                </div>
                                <div className="title">
                                    <Link to={`/details/${item.imdbID}`}>
                                        <a href="/#">{item.Title}</a>
                                        <a href="/#">{item.Year}</a>
                                    </Link>
                                </div>
                            </div>
                        </GridItem>
                    ))
                }
            </Grid>
           
        </div>
    );
}

export default Home;
