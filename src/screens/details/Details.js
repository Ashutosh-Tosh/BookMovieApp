import React, { useState , useEffect} from "react";
import Header from "../../common/header/Header";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Icon from '@material-ui/core/Icon';
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {GridList,GridListTile,GridListTileBar} from "@material-ui/core";
import { ImageList , ImageListItem , ImageListItemBar} from '@material-ui/core'

export default function Details(props){
    const[bookShowButton, setBookShowButton] = useState(true);
    const[openedMovie , SetOpenedMovie] = useState("");
    const[genresInString, setGenresInString] = useState("");
    const[dateToDateString, setDateToDateString]= useState("");
    const[movieDuration, setMovieDuration] = useState("");
    const[crticsRating, setCriticsRating] = useState("");
    const[movieTitle , setMovieTitle] = useState("");
    const[movieLink, setMovieLink] = useState("");
    const[youtubeTrailerLink, setYoutubeTrailerLink] = useState("");
    const[ratingGiven , setRatingGiven] = useState(false);
    const[fiveStars, setFiveStars] = useState([1,2,3,4,5]);
    const[starNumber, setStarNumber] = useState();
    const[artistsList, setArtistList] = useState([]);
    


    
function getYouTubeVideoId(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : false;
}

    useEffect(() => {
        
      const  idfunc = async() => {
            
            //console.log(openedMovieId);
            const idResponse = await fetch(`http://localhost:8085/api/v1/movies/${props.match.params.id}`);
            if(idResponse.ok){
                const movietemp = await idResponse.json();
                SetOpenedMovie(movietemp);
                setGenresInString(movietemp.genres.toString());
                setDateToDateString(new Date(movietemp.release_date).toDateString());
                setMovieDuration(movietemp.duration);
                setCriticsRating(movietemp.critics_rating);
                setMovieTitle(movietemp.title);
                setMovieLink(movietemp.wiki_url);
                setYoutubeTrailerLink(getYouTubeVideoId(movietemp.trailer_url));
                setArtistList(movietemp.artists);
                console.log(movietemp.artists);
            }

      }  
      idfunc();
      
    }, [])



    return( 
        <div className="home">
            <div className="header">    
                 <Header baseUrl={props.baseUrl} id={props.match.params.id} props={props} bookShowButton = {bookShowButton} setBookShowButton = {setBookShowButton} openedMovie = {openedMovie}/>
            </div>
            <Typography style={{ 
                    cursor: "pointer" ,
                    marginLeft : "24px", 
                    marginTop : "8px", 
                    marginBottom : "0px", 
                    height : "24px"}}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Icon fontSize="small" >&lt;Back to Home
                            </Icon>
                        </Link>
                </Typography>
            <div className="details-main" style={{   display: 'flex'   }}>
           
                <div style={{ width: "20%",  marginLeft: "24px"  }}>
                <div>
                
            </div>
                    <img src={openedMovie.poster_url} alt={"Image deleted from source"} />
                </div>
                <div style={{ width: "60%"  }}>
                    <Typography variant="headline" component="h2" >
                        {movieTitle}
                    </Typography>
                    <Typography> 
                        <b>Genres: </b>{genresInString}
                    </Typography>
                    <Typography  >
                        <b>Duration: </b> {movieDuration}
                    </Typography>
                    <Typography  >
                        <b>Release Date: </b> {dateToDateString} 
                    </Typography>
                    <Typography  >
                        <b>Rating: </b> {crticsRating}
                    </Typography><br/>
                    <Typography  >
                        <b>Plot: </b><a href={movieLink}>(Wiki link)</a> {openedMovie.storyline}
                    </Typography><br/>
                    <Typography>
                        <b>Trailer: </b>
                    </Typography>
                    <Typography style = {{marginTop : '16px'}}>
                        <YouTube videoId={youtubeTrailerLink}/>
                    </Typography>
                   
                </div>
                <div style={{ width: "20%" , margin : '24px' }}>
                    <Typography  >
                        <b>Rate This Movie: </b>
                    </Typography>
                    <Typography  >
                        {!ratingGiven && fiveStars.map((istarNumber, key)=>
                        (<StarBorderIcon id = {istarNumber} onClick = 
                        {()=>{setStarNumber(istarNumber);  setRatingGiven(true); }} 
                        key = {key}/>))}


                        {ratingGiven && fiveStars.map((istarNumber, key)=>{
                        if(istarNumber<=starNumber)
                        return(<StarBorderIcon id = {istarNumber} style={{color:"yellow"}} key = {key}/>)
                        return(<StarBorderIcon id = {istarNumber} key = {key}/>)
                        })
                        }
                    </Typography>
                    <Typography style = {{marginTop : '16px' , marginBottom : '16px'}} >
                        <b>Artists: </b>
                    </Typography>  
                        <GridList cols = {2}>
                            {artistsList.map((artist,key) => (
                                <GridListTile  key = {key+5699}>
                                <img src={artist.profile_url} key={key+8989} onClick={()=>{  window.location = `${artist.wiki_url}` }}/>
                                <GridListTileBar title = {`${artist.first_name} ${artist.last_name}`} key = {key+9699} />
                                </GridListTile>
                            ))}    
                        </GridList>
                </div>
            </div>
        </div> 
    );
}