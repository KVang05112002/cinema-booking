import React, { useEffect, useState } from "react";
import './detail.scss';
import { useParams, Link } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import apiConfigs from "../../api/apiConfigs";
import Button from '../../component/button/Button';
import MoviesList from '../../component/movies-list/MoviesList';
import DateList, { test } from './DateList';
import TimeList from "./TimeList";


const Detail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);


    useEffect(() => {
        const getDetail = async () => {
            const res = await tmdbApi.detail(id, { params: {} });
            console.log(res, 'test');
            setItem(res);
            window.scrollTo(0, 0)
        }
        getDetail();
    }, [id])

    return (
        <>
            {
                item && (
                    <>
                        <div
                            className='banner'
                            style={{ backgroundImage: `url(${apiConfigs.originalImage(item.backdrop_Path || item.poster_Path)})` }}
                        ></div>
                        <div className='movie-content container mb-3'>
                            <div className='movie-content__poster'>
                                <div className='movie-content__poster__img'
                                    style={{ backgroundImage: `url(${apiConfigs.originalImage(item.backdrop_Path || item.poster_Path)})` }}
                                ></div>
                            </div>
                            <div className='movie-content__info'>
                                <h1 className='title'>
                                    {item.title}
                                </h1>
                                <p className='overview'>{item.overview}</p>
                                <div className='date'>
                                    <div className='section__header'>
                                        <h2>Select date range</h2>
                                    </div>
                                    {/*date list */}
                                    <DateList id={item.id} />
                                </div>
                                <div className='time'>
                                    <div className='section__header'>
                                        <h2>Select time slot</h2>
                                    </div>
                                    {/* time list */}
                                    <TimeList id={item.id} />
                                </div>
                                <Link to={`/seats/${test}`}>
                                    <Button >Buy ticket</Button>
                                </Link>
                            </div>
                        </div>
                        <div className='container list'>
                            <div className='section mb-3'>
                                <h3 className="title-trailer">{item.title}</h3>
                                <iframe width="1000" height="515" src={item.trailer_Path !== null ? 'https://www.youtube.com/embed/' + item.trailer_Path.slice(32) : 'https://www.youtube.com/embed/' + item.trailer_Path} />
                                {/* <VideoList id={item.id} /> */}
                            </div>
                            <div className='section mb-3'>
                                <div className='section__header mb-2'>
                                    <h2>Similar</h2>
                                </div>
                                <MoviesList id={item.id} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Detail;