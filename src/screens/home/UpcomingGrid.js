import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import  { useState } from 'react';
import ImageList from '@material-ui/core/ImageList'


   



export default function UpcomingGrid({imageUrls, titles , movieData}) {


   

    return ( 
                <ImageList rowHeight={250}  cols={6}
                style ={{ display: 'flex' , flexWrap: 'nowrap'}}>
                    {imageUrls.map((item,key) => (
                        <ImageListItem key={key+499}>
                            <img
                            src={item}
                            alt="Image not available"
                            key={key+199}
                            />
                            <ImageListItemBar 
                             title={titles[key]}
                             key = {key+99}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>                
      )
    }
