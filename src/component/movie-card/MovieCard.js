import React from "react";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import apiConfigs from "../../api/apiConfigs";
import YouTubeIcon from '@mui/icons-material/YouTube';

const MovieCard = (props) => {

    const item = props.item;
    const link = '/Movie/' + item.id;
    const bg = apiConfigs.w500Image(item.poster_Path || item.backdrop_Path);

    return (
        <Link to={link} >
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <Button>
                    <YouTubeIcon />
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    )
}

export default MovieCard;