import React from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import UpcomingGrid from './UpcomingGrid';
import  { useState, useEffect } from 'react';
import ImageList from '@material-ui/core/ImageList'
import axios from 'axios';



export default function Home(props){
    
    const[imageUrls, setImageUrls] = useState([]);
    const[titles, setTitles] = useState([]);
    const[movieData, setMovieData] = useState([]);

  
    useEffect(() => {
        const getImageurls = async () => {
  
            const response = await axios.get(
            "http://localhost:8085/api/v1/movies?page=1&limit=100");
                
            const urls = response.data.movies.map((movie)=>{
                return movie.poster_url;
            });
            const titlesT = response.data.movies.map((movie)=>{
                return movie.title;
            });
            console.log(response.data);
           
                setImageUrls(urls);
                setTitles(titlesT);
                setMovieData(response.data);

        }
        getImageurls();
       
    }, []);

   
    
    return(
        <div className="home">
            <div className="header">    
                <Header/>
            </div>
            <div className="heading">
                Upcoming Movies
            </div>
            
            <div id="upcmomingMoviesGrid" className="upcoming-movies">
                <UpcomingGrid imageUrls ={imageUrls} titles = {titles} movieData={movieData}/>
            </div> 
        </div>
    )
}