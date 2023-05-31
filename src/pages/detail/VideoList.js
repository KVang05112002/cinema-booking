import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./detail.scss";
import tmdbApi from "../../api/tmdbApi";


const VideoList = props => {
    const { category } = useParams();


    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let res = null;
            res = await tmdbApi.getVideos(category, props.id);
            setItems(res);
        }
        getList();
    }, [category, props.id])

    return (
        <div >
            {
                items.map((item, i) => (
                    <Video key={i} item={item} />
                ))
            }
        </div>
    )
}

const Video = props => {
    const item = props.item;
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, [])
    return (
        <div className="videos">
            <div className="videos__title">
                <h2>{item === item.id ? item.title : console.log('no title')}</h2>
            </div>
            <iframe
                src={`${item.trailer_Path}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    )
}

export default VideoList;