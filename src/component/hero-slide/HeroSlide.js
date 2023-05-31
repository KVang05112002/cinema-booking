import React, { useEffect, useRef, useState } from 'react';
import './heroslide.scss';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button, { OutlineButton } from '../button/Button';
import { useHistory } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import apiConfigs from '../../api/apiConfigs';
// Styles must use direct files imports
import '../../../node_modules/swiper/swiper.scss'; // core Swiper
import '../../../node_modules/swiper/modules/navigation/navigation.scss';
import '../../../node_modules/swiper/modules/pagination/pagination.scss';
import Modal, { ModalContent } from '../modal/Modal';

const HeroSlide = () => {
    SwiperCore.use([Autoplay]);
    const [movieItems, setMovieItem] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const data = await tmdbApi.getMoviesList({ params });
                setMovieItem(data);
            } catch (error) {
                console.error(error);
            }
        }
        getMovies();

    }, [])

    return (
        <div className="hero-slide">
            <Swiper modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            //  autoplay={{ delay: 5000 }}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (

                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />

                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item} />)
            }
        </div>
    )
}

const HeroSlideItem = props => {
    let history = useHistory();
    const item = props.item;

    const background = apiConfigs.originalImage(
        item.backdrop_Path ? item.backdrop_Path : item.poster_Path
    )

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        // const videos = await tmdbApi.getVideos(category.movie, item.id)


        if (item.trailer_Path) {
            const videoSrc = 'https://www.youtube.com/embed/' + item.trailer_Path.slice(32);
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
            // modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
            console.log(videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';

        }

        modal.classList.toggle('active');
    }


    return (

        <div className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => history.push('/Movie/' + item.id)}>
                            Booking now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfigs.w500Image(item.poster_Path)} alt=""></img>
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute('src', '');
    // const closeModal = () => {
    //     contentRef.current.parentNode.classList.remove('active');
    //     if (props.onClose) props.onClose();
    // }

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;