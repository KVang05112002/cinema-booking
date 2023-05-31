import React, { useState, useEffect } from "react";
import './detail.scss';
import tmdbApi from "../../api/tmdbApi";
import moment from "moment/moment";
import { useParams } from "react-router-dom";

function TimeList() {
    const { id } = useParams();
    const [times, setTimes] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState('transparent');
    const [selectedId, setSelectedId] = useState(null); // Thêm một trạng thái để lưu trữ id của nút được chọn

    useEffect(() => {
        const getDate = async () => {
            const res = await tmdbApi.getDateList(id, { params: {} });
            console.log(res);
            if (res && res.length > 0) {
                res.map(item => {
                    item.start_Time = moment(item.start_Time).format('hh:mm a')
                    return item;
                });
            }
            setTimes(res);
            window.scrollTo(0, 0)

        }
        getDate();
    }, [id])

    const handleClick = (item) => {
        if (!item.id) return;
        setBackgroundColor('#ff0000');
        setSelectedId(item.id); // Cập nhật trạng thái với id của nút được nhấp vào
    };

    return (
        <div className="times">
            {
                times.map((item, i) => (
                    // Thay đổi thuộc tính style để chỉ thay đổi màu nền của nút có id trùng với selectedId
                    <button className="times__item" key={i} style={{ backgroundColor: item.id === selectedId ? backgroundColor : 'transparent' }} onClick={() => handleClick(item)}>
                        {item.start_Time}
                    </button>
                ))
            }
        </div >
    )
}

export default TimeList;