import { Link } from 'react-router-dom'

const HomeText = () => {
    return(
        <div className="home-txt">
            <h3>Empowering Your Journey to Success</h3>
            <p>We are dedicated to provide exceptional education and resources to empower aspiring computer scientists and software engineers. Our state-of-the-art facilities and experienced faculty members ensure a dynamic learning environment where students can excel in their academic journey.</p>
            <div className="home-txt-btn">
                <Link to="/signup"><button className="home-txt-btn-one">TRY FOR FREE</button></Link>
                <button className="home-txt-btn-two">CONTACT US</button>
            </div>
        </div>
    )
}

export default HomeText