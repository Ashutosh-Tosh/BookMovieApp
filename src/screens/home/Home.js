import React from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import UpcomingGrid from './UpcomingGrid';
import  { useState, useEffect } from 'react';
import ImageList from '@material-ui/core/ImageList'
import axios from 'axios';
import { Button, MenuItem, Paper } from "@material-ui/core";
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField , withStyles, FormLabel,  FormControl, FormControlLabel , Input, InputLabel , Checkbox , FormHelperText} from '@material-ui/core';
import Select from '@material-ui/core/Select';


const styles = (theme) => ({
formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});



 function Home(props){
    const { baseUrl,  classes } = props;
    const[imageUrls, setImageUrls] = useState([]);
    const[titles, setTitles] = useState([]);
    const[movieData, setMovieData] = useState([]);
    const[releaseDates, setreleaseDates] = useState([]);
    const[allmoviesPosters, setAllMoviesPosters] = useState([]);
    const[allTitles, setAllTitles] = useState([]);
    const[allreleaseDates, setAllRelaseDates] = useState([]);
    const[allGenresforSelection, setAllGenresForSelection]= useState([]);
    const[selectedGenres, setSelectedGenres] = useState([]);
    const[allArtisitsForSelection,SetAllArtistsForSelection] = useState([]);
    const[releasedMovieData,setReleasedMovieData] = useState([]);

    
    useEffect(() => {
        const getImageurls = async () => {
  
            const response = await axios.get(
            `${baseUrl}movies?status=PUBLISHED`);
            const allmoviesresponse = await axios.get(
            `${baseUrl}movies?status=RELEASED`);

            const allGenres = await axios.get(`${baseUrl}genres`);

            const artistsResponse = await axios.get(`${baseUrl}artists`);

                
                
                const urls =await response.data.movies.map((movie)=>{
                    return movie.poster_url;
                });
                const titlesT =await response.data.movies.map((movie)=>{
                    return movie.title;
                });
            
                const releaseDatez =await response.data.movies.map((movie)=>{
                    return movie.release_date;
                });
            
           
                const allmoviesresponseUrls = await allmoviesresponse.data.movies.map((movie)=>{
                    return movie.poster_url;
               
                });
                const alltitlesT =await allmoviesresponse.data.movies.map((movie)=>{
                    return movie.title;
                });
            
                const allreleaseDatez =await allmoviesresponse.data.movies.map((movie)=>{
                    return movie.release_date;
                });

                const allGenresarray = await allGenres.data.genres.map((genreType)=>{
                    return genreType.genre;
                })

            
                const artistsArray = await artistsResponse.data.artists;
                SetAllArtistsForSelection(artistsArray);

            
           
                setImageUrls(urls);
                setTitles(titlesT);
                setMovieData(response.data);
                setReleasedMovieData(allmoviesresponse);
                setreleaseDates(releaseDatez);
                setAllMoviesPosters(allmoviesresponseUrls);
                setAllRelaseDates(allreleaseDatez);
                setAllTitles(alltitlesT);
                setAllGenresForSelection(allGenresarray);
                console.log(allmoviesresponse);


        }
        getImageurls();
       
    }, []);

   //console.log(releasedMovieData.data);
    
    return(
        <div className="home">
            <div className="header">    
                <Header props={props} baseUrl = {baseUrl} />
            </div>
            <div className="heading">
                Upcoming Movies
            </div>
            
            <div id="upcmomingMoviesGrid" className="upcoming-movies">
                <UpcomingGrid imageUrls ={imageUrls} titles = {titles} movieData={movieData}/>
            </div> 
            <div style={{  display: 'flex' }}>  
  
                <div style={{ width: "76%" , margin: "16px"}}>  
                    <Grid >
                        <ImageList rowHeight={350}  cols={4}
                        style ={{ display: 'flex' }}>
                            {allmoviesPosters.map((item,key) => (
                                <ImageListItem style = {{ cursor : "pointer"}} key={key+499} onClick={()=>{ 
                                    props.history.push(`/movie/${releasedMovieData.data.movies[key].id}`)}}>
                                    <img
                                    src={item}
                                    alt="Image not available"
                                    key={key+199}
                                    />
                                    <ImageListItemBar 
                                    title={allTitles[key]}
                                    subtitle = {`Release Date:Fri ${allreleaseDates[key]}`}
                                    key = {key+49}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>     
                    </Grid> 
                </div>  

                <div style={{ width:"24%", margin: "16px"}}>  
                
                <Card>
                <FormControl className={classes.formControl}>
                    <Typography className={classes.title} color="textSecondary">
                        FIND MOVIES BY:
                    </Typography> 
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="my-input">Movie Name</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />      
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="my-input">Genres</InputLabel>
                            <Select aria-describedby="my-helper-text"
                            value={[]}
                            multiple
                            //onChange={()=>{}}
                            >  
                                {allGenresforSelection.map((genre,key)=>(  
                                    <MenuItem value={genre} key={key+7499}>
                                        <FormControlLabel
                                        control={
                                            <Checkbox   
                                                //onChange={}
                                                //name="checkedB"
                                            />
                                        }
                                        label={genre}/>
                                    </MenuItem>
                                ))}
                            </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                                
                <InputLabel htmlFor="my-input">Artists</InputLabel>
                        <Select 
                        value={[]}
                        multiple
                        //onChange={()=>{}}
                        >  
                            {allArtisitsForSelection.map((artistDetail,key)=>(  
                                    <MenuItem value={artistDetail.first_name} key={key+4539}>
                                        <FormControlLabel
                                        control={
                                            <Checkbox   
                                        //onChange={}
                                        //name="checkedB"
                                            />
                                    }
                                    label={`${artistDetail.first_name} ${artistDetail.last_name}`}/>
                                    </MenuItem>
                            ))}
                        </Select>

                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField id="start-date" type="date" InputLabelProps={{ shrink: true }} label = "Realease Date Start" />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField id="end-date" type="date" InputLabelProps={{ shrink: true }} label = "Realease Date End" />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button variant="contained" color="primary">APPLY</Button>
                </FormControl>
               
                </Card> 
                
                </div>  
            </div>  
        </div>
    );
}

export default withStyles(styles)(Home);