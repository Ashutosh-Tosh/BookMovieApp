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
import { ListItemText ,TextField , withStyles, FormLabel,  FormControl, FormControlLabel , Input, InputLabel , Checkbox , FormHelperText} from '@material-ui/core';
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
    const[filterMovieName , setFiltermovieName] = useState("");
    const[genres, setGenres] = useState([]);
    const[artists, setArtists] = useState([]);
    const[releaseDateStart, setReleaseDateStart] = useState("");
    const[releaseDateEnd, setReleaseDateEnd] = useState("");

    
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
   const filterButtonHandler = async () => {
    let linkstring = "?status=RELEASED";
    if (filterMovieName !== "") {
      linkstring += "&title=" + filterMovieName;
    }
    if (artists.length > 0) {
      linkstring += "&artists=" + artists.toString();
      
    }
    if (genres.length > 0) {
        linkstring += "&genres=" + genres.toString();
        
      }
    if (releaseDateStart !== "") {
      linkstring += "&start_date=" + releaseDateStart;

    }
    if (releaseDateEnd !== "") {
      linkstring += "&end_date=" + releaseDateEnd;
    }
    console.log(`${baseUrl}movies${encodeURI(linkstring)}`);
    const rawResponse = await fetch(`${baseUrl}movies${encodeURI(linkstring)}`);
    
    if (rawResponse.ok) {
        const result = await rawResponse.json();
        console.log(result.movies);

        
        const allmoviesresponseUrls = await result.movies.map((movie)=>{
            return movie.poster_url;
        })

        const alltitlesT =await result.movies.map((movie)=>{
            return movie.title;
        });
    
        const allreleaseDatez =await result.movies.map((movie)=>{
            return movie.release_date;
        });

    
        setReleasedMovieData(result);

        setAllMoviesPosters(allmoviesresponseUrls);
        setAllRelaseDates(allreleaseDatez);
        setAllTitles(alltitlesT);
        


    }
  }
    
    return(
        <div className="home">
            <div className="header">    
                <Header props={props} baseUrl = {baseUrl} />
            </div>
            <div className="heading">
                Upcoming Movies
            </div>
            
            <div id="upcmomingMoviesGrid" className="upcoming-movies">
                <GridList cellHeight= {250}  cols={6}
                    style ={{ display: 'flex' , flexWrap: 'nowrap' ,transform: "translateZ(0)" , width : "100%"}}>
                        {imageUrls.map((item,key) => (
                            <GridListTile key={key+499}>
                                <img
                                src={item}
                                alt="Image not available"
                                key={key+199}
                                />
                                <GridListTileBar 
                                title={titles[key]}
                                key = {key+99}
                                />
                            </GridListTile>
                        ))}
                </GridList>                
            </div> 
            <div style={{  display: 'flex' }}>  
  
                <div style={{ width: "76%" , margin: "16px"}}>  
                    <Grid >
                        <GridList cellHeight={350}  cols={4}
                        style ={{ display: 'flex' }}>
                            {allmoviesPosters.map((item,key) => (
                                <GridListTile style = {{ cursor : "pointer"}} key={key+499} onClick={()=>{ 
                                    props.history.push(`/movie/${releasedMovieData.data.movies[key].id}`)}}>
                                    <img
                                    src={item}
                                    alt="Image not available"
                                    key={key+199}
                                    />
                                    <GridListTileBar 
                                    title={allTitles[key]}
                                    subtitle = {`Release Date: ${new Date(allreleaseDates[key]).toDateString()}`}
                                    key = {key+49}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>     
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
                    <Input id="my-moviename-input" aria-describedby="my-helper-text" onChange={(e)=>{setFiltermovieName(e.target.value)}}/>      
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="my-input">Genres</InputLabel>
                            <Select aria-describedby="my-helper-text"
                            input={<Input id="select-multiple-checkbox-genre" />}
                            renderValue={(selected) => selected.join(",")}
                            value={genres}
                            onChange={(e)=>{setGenres(e.target.value);}}
                            multiple
                            //onChange={()=>{}}
                            >  
                                {allGenresforSelection.map((genre,key)=>(  
                                    <MenuItem value={genre} key={key+10999}>
                                    <Checkbox checked={genres.indexOf(genre) > -1} />
                                    <ListItemText primary={genre} />
                                    </MenuItem>
                                ))}
                            </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                                
                <InputLabel htmlFor="my-input">Artists</InputLabel>
                        <Select 
                        multiple
                        input={<Input id="s-checkbox" />}
                        renderValue={(selected) => selected.join(",")}
                        value={artists}
                        onChange={(e)=>{setArtists(e.target.value);}}
                        //onChange={()=>{}}
                        >  
                            {allArtisitsForSelection.map((artistDetail,key)=>(  
                                    <MenuItem value={artistDetail.first_name+" "+artistDetail.last_name} key={key+4539}>
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                            checked={
                                            artists.indexOf(artistDetail.first_name + " " + artistDetail.last_name) > -1
                                            }
                                            />
                                    }
                                    label={`${artistDetail.first_name} ${artistDetail.last_name}`}/>
                                    </MenuItem>
                            ))}
                        </Select>

                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField onChange={(e)=>{setReleaseDateStart(e.target.value)}} id="start-date" type="date" InputLabelProps={{ shrink: true }} label = "Realease Date Start"  />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField  onChange={(e)=>{setReleaseDateEnd(e.target.value)}}  id="end-date" type="date" InputLabelProps={{ shrink: true }} label = "Realease Date End" />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button onClick={filterButtonHandler} variant="contained" color="primary">APPLY</Button>
                </FormControl>
               
                </Card> 
                
                </div>  
            </div>  
        </div>
    );
}

export default withStyles(styles)(Home);