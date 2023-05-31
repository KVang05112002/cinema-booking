import './ScssNotDound.scss';
import { useHistory } from 'react-router-dom';
import bg from '../../assets/footer-bg.jpg';

const NotFound = () => {
    let history = useHistory()
    const handleHome = () => {
        history.push('/')
    }
    return (
        <>
            <div className='notfound' style={{ backgroundImage: `url(${bg})` }}></div>
            <div className="notfound-container">
                <h4>This page isn't avaliable</h4>
                <h5>The link may be broken or the page may have been removed. </h5>
                <button className="btn btn-primary" onClick={handleHome}>Go to Homepage</button>
            </div>
        </>
    )
}
export default NotFound;