import React from "react";
import MovieGrid from "../component/movie-grid/MovieGrid";
import bg from '../assets/footer-bg.jpg';
import './pages-scss/catalog.scss';

const CateLog = () => {
    return (
        <>
            <div className="header-bg" style={{ backgroundImage: `url(${bg})` }}>
                Movie
            </div>
            <div className='container'>
                <div className='section mb-3'>
                    <MovieGrid />
                </div>
            </div>
        </>
    )
}

export default CateLog;