import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';

import tmdbApi, { movieType, category } from '../../api/tmdbApi';


const MovieGrid = props => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, settotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let res = null;
            const params = {};
            res = await tmdbApi.getMoviesList({ params });
            setItems(res);
        }
        getList();
    }, [])

    const loadmore = async () => {
        let res = null;

        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            res = await tmdbApi.getMoviesList({ params });
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            res = await tmdbApi.search(props.category, { params });
        }
        setItems([...items, ...res.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className='section mb-3'>
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className='movie-grid'>
                {
                    items.map((item, i) => <MovieCard item={item} key={i} />)}
            </div>
            {
                page < totalPage ? (
                    <div className='movie-grid__loadmore'>
                        <OutlineButton className="small" onClick={loadmore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>

    )
}

const MovieSearch = (props) => {

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/Movie/:id`);
            }
        }, [keyword, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        }
    }, [keyword, goToSearch]);

    return (
        <div className='movie-search'>
            <Input
                type='text'
                placeholder='Enter Input'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="" onClick={goToSearch}>Search</Button>
        </div>
    )
}





export default MovieGrid;