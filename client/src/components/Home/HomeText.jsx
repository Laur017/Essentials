import { Link } from 'react-router-dom'

const HomeText = () => {
    return(
        <div className="home-txt">
            <h3>Ceva text foarte interesant ce descrie aplicatia</h3>
            <p>Ceva pargram Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Porro non cum esse accusamus fuga quia quasi, soluta aut, 
                ducimus consequatur eveniet quam ipsam earum deleniti recusandae vel, magni similique facilis.</p>
            <div className="home-txt-btn">
                <Link to="/signup"><button className="home-txt-btn-one">TRY FOR FREE</button></Link>
                <button className="home-txt-btn-two">CONTACT US</button>
            </div>
        </div>
    )
}

export default HomeText