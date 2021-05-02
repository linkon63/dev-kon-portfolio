import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Project1 from '../../Data/project1.PNG';
import Project2 from '../../Data/project2.PNG';
import Project3 from '../../Data/project3.PNG';
import HomeProjectsData from '../../Data/HomeProjectsData.json';
import { Link } from 'react-router-dom';
import './MyProject.css'
import Typing from 'react-typing-animation';
import { FiberManualRecord, GitHub } from '@material-ui/icons';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  })
const MyProjects = () => {
    const classes = useStyles();
    console.log(HomeProjectsData);
    const projectData = HomeProjectsData;
    // const [projectData, setProjectData] = useState([]);
    // const apiProjectData = setProjectData(HomeProjectsData);
    return (
        <div  className="pb-5 mt-3" className="projectMain" style={{height:'auto', width:'100%', margin:'10px auto', backgroundColor:'#3a393e'}}>
            <div className="container" >
                <div id="projects" className="text-white pt-5 pb-5">
                    <h1 >Projects</h1>
                    <Typing>Watch my projects I have done own</Typing>
                    <div className="row m-auto">
                        {
                            projectData?.map(data =>
                            <div className="col-md-4 mt-3 mb-5 ">
                            <Card className={classes.root}>
                                <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={data.image}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                {data.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {data.description}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className="text-center">
                                <Button size="small" color="primary">
                                    <a href={data.liveSite}><FiberManualRecord></FiberManualRecord> Live</a>
                                </Button>
                                <Button size="small" color="primary">
                                    <a href={data.clientSiteCode}> <GitHub></GitHub> C-Code</a>
                                </Button>
                                <Button size="small" color="primary">
                                    <a href={data.serverSiteCode}><GitHub></GitHub> S-Code</a>
                                </Button>
                            </CardActions>
                            </Card>
                        </div>  )
                        }
                    <div className="text-center">
                    <Link to='/projects'><button className="btn btn-success ">See More</button></Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProjects;