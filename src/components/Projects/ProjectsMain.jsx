import { Computer, GitHub, ImportantDevices, ViewModule } from '@material-ui/icons';
import React from 'react';
import projectData from '../../Data/allProjectsData.json';
const ProjectsMain = () => {
    const allProjects = projectData;
    return (
        <div className="container">
                <h1>Project</h1>
                <div>
                    <div className="row">
                        {
                            allProjects.map(data => 
                                <div className="col-md-6 d-flex justify-content-center">
                                    <div className="mt-5">
                                        <div class="card  mb-2 w-75 m-auto" style={{width: '18rem'}}>
                                            <img src={data.image} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                        <h5 class="card-title"><strong>{data.name}</strong></h5>
                                            <p class="card-text">{data.description}</p>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item text-info"> <ImportantDevices color="disabled" fontSize="large"></ImportantDevices> <b>{data.usesTech}</b> </li>
                                            <li class="list-group-item"><Computer></Computer> STACK : {data.projectStack}</li>
                                        </ul>
                                        <div class="card-body">
                                            <a href={data.liveSite} class="card-link"><ViewModule></ViewModule> Live Site</a>
                                            <a href={data['clientSiteCode:']} class="card-link"><GitHub></GitHub> C-Code</a>
                                            <a href={data.serverSiteCode} class="card-link"><GitHub></GitHub> S-Code</a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                )
                        }
                    </div>
                </div>  
        </div>
    );
};

export default ProjectsMain;