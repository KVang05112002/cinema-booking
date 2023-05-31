import React, { useEffect, useState } from "react";
import './seats.scss';
import bg from '../../assets/footer-bg.jpg';
import Button from "../button/Button";
import { toast } from 'react-toastify';
import axios from "axios";
import { useParams } from "react-router-dom";

const Seats = (props) => {
    const { id } = useParams();
    //set up Seats
    const [seats, setSeats] = useState([])
    // const [selectedSeats, setSelectedSeats] = useState([]);
    // const { pathname } = useLocation();


    useEffect(() => {
        const funcSeat = async () => {
            try {
                const res = await axios.get(`https://localhost:7181/api/Rooms/GetSeatsOfRoom${id}`);
                const selectedSeat = res.data.filter(seat => {
                    return seat.rowSeat === 'A' || seat.rowSeat === 'B' || seat.rowSeat === 'C' || seat.rowSeat === 'D';
                })
                // selectedSeat.sort((a, b) => {
                //     if (a.rowSeat === b.rowSeat) {
                //         return a.number - b.number;
                //     }
                //     return a.rowSeat.charCodeAt(0) - b.rowSeat.charCodeAt(0);
                // });
                setSeats(selectedSeat);
            } catch (err) {
                toast.error("don't have any Seats");
            }
        }
        funcSeat()

    }, [])

    // useEffect(() => {
    //     const id = localStorage.getItem('id')
    //     const checkSeat = async () => {
    //         try {
    //             const res = await axios.get(`https://localhost:7181/api/Bookings/BookedHistory${id}`)
    //             setSelectedSeats(res.data.selectedSeat)

    //         } catch (e) {
    //             toast.error('Have somw problem!')
    //         }
    //     }
    //     checkSeat();
    // }, [])

    // const handleSeclect = () => {
    //     const newSelectedSeats = [...selectedSeats, seats]; // add new selected seat to array
    //     setSelectedSeats(newSelectedSeats);
    // }


    return (
        <>
            <div
                className='backgroundHeader'
                style={{ backgroundImage: `url(${bg})` }}
            ></div>
            <div className="seats">
                <div className="screen">screen</div>
                <div className="seats__grid">
                    {
                        seats.map((item, i) => (
                            <div className={`seats__content ${item.rowSeat === 'A' ? 'row-a' : ''} ${item.rowSeat === 'B' ? 'row-a' : ''} ${item.rowSeat === 'C' ? 'row-a' : ''} ${item.rowSeat === 'D' ? 'row-a' : ''}`} key={i}>
                                {/* <div className="seats__content__title">{item.rowSeat}</div> */}
                                <div className={`seats__content__number-chair`} >{item.rowSeat}-{item.number}</div>
                            </div>
                        ))
                    }
                </div>

                <div className="note">
                    <div className="note__content">
                        <div className="note__content__color" style={{ backgroundColor: "#ff0000" }}></div>
                        selected
                    </div>
                    <div className="note__content">
                        <div className="note__content__color" style={{ backgroundColor: "#BFCCB5" }}></div>
                        choosing a chair
                    </div>
                    <div className="note__content">
                        <div className="note__content__color" style={{ backgroundColor: "transparent" }}></div>
                        Not selected yet
                    </div>

                </div>
                <div className="button-payment">
                    <Button>Payment</Button>
                </div>
            </div>
        </>
    )
}



export default Seats;