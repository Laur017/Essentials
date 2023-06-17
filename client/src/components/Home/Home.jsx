import HomeModel from './HomeModel'
import HomeText from './HomeText'

const Home = () => {
    
    return(
        <div className="home">
            <HomeText />
            <div className="model-home">
                <HomeModel />
            </div>
        </div>
    )

}

export default Home