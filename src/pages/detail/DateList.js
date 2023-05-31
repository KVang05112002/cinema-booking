import React, { useEffect, useState } from "react";
import './detail.scss';
import tmdbApi from "../../api/tmdbApi";
import { useParams } from "react-router-dom";
import moment from 'moment/moment';

export let test = '';

const Date = () => {
    const { id } = useParams();
    const [datetime, setDatetime] = useState([]);

    useEffect(() => {
        const getDate = async () => {
            const res = await tmdbApi.getDateList(id, { params: {} });
            console.log(res);
            if (res && res.length > 0) {
                res.map(item => {
                    item.start_Time = moment(item.start_Time).format('DD/MM/YYYY')
                    return item;
                });
            }
            test = res[0].room_Id
            console.log(test, 'ád');
            setDatetime(res);
            window.scrollTo(0, 0)

        }
        getDate();
    }, [id])

    const [backgroundColor, setBackgroundColor] = useState('transparent');
    const [selectedId, setSelectedId] = useState(null); // Thêm một trạng thái để lưu trữ id của nút được chọn

    const handleClick = (item) => {
        if (!item.id) return;
        setBackgroundColor('#ff0000');
        setSelectedId(item.id); // Cập nhật trạng thái với id của nút được nhấp vào
    };
    return (
        <div className="dates">
            {
                datetime.map((item, i) => (
                    <button className="dates__item" key={i} style={{ backgroundColor: item.id === selectedId ? backgroundColor : 'transparent' }} onClick={() => handleClick(item)}>
                        {item.start_Time}
                    </button>
                ))
            }
        </div >
    )
}

export const getDate = async (id) => {
    const res = await tmdbApi.getDateList(id, { params: {} });
    console.log(res);
    if (res && res.length > 0) {
        res.map(item => {
            item.start_Time = moment(item.start_Time).format('DD/MM/YYYY')
            return item;
        });
    }
    window.scrollTo(0, 0)

}

export default Date;