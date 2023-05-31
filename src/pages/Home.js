import React from "react";
import HeroSlide from "../component/hero-slide/HeroSlide";
import { Link } from 'react-router-dom';
import { OutlineButton } from '../component/button/Button';
import MoviesList from "../component/movies-list/MoviesList";

const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className='container'>
                <div className='section mb-3'>
                    <div className='seaction__header mb-2'>
                        <h2>Top Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MoviesList />
                </div>

                <div className='section mb-3'>
                    <div className='seaction__header mb-2'>
                        <h2>About us</h2>
                        <Link to="/movie">
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    {/* <MoviesList category={category.movie} type={movieType.top_rated} /> */}
                </div>
            </div>
        </>
    )
}

export default Home;