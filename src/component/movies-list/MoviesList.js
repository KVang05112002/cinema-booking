import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi from '../../api/tmdbApi';
import "./movieslist.scss";
import MovieCard from '../movie-card/MovieCard';

const MoviesList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let res = null;
            const params = {};
            res = await tmdbApi.getMoviesList({ params });
            setItems(res);
        }
        getList();
    }, [])

    return (
        <div className='movie-list'>
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} />
                            {/* <img src={apiConfigs.w500Image(item.poster_path)} alt='' /> */}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MoviesList.propTypes = {

}

export default MoviesList;