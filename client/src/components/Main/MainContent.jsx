import { Link } from 'react-router-dom'

const data = [
    {
        id: '01',
        name: 'Math',
        text: 'Math Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, hic amet earum sed odit saepe modi maiores quaerat labore? Ratione nemo commodi molestiae ab! Explicabo earum assumenda ut architecto quisquam.'
    },
    {
        id: '02',
        name: 'Computer Science',
        text: 'Computer Science Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, hic amet earum sed odit saepe modi maiores quaerat labore? Ratione nemo commodi molestiae ab! Explicabo earum assumenda ut architecto quisquam.'
    },
    {
        id: '03',
        name: 'Geography',
        text: 'Geography Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, hic amet earum sed odit saepe modi maiores quaerat labore? Ratione nemo commodi molestiae ab! Explicabo earum assumenda ut architecto quisquam.'
    },
    {
        id: '04',
        name: 'Chemistry',
        text: 'Let him cook Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, hic amet earum sed odit saepe modi maiores quaerat labore? Ratione nemo commodi molestiae ab! Explicabo earum assumenda ut architecto quisquam.'
    },
    {
        id: '05',
        name: 'English',
        text: 'English Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, hic amet earum sed odit saepe modi maiores quaerat labore? Ratione nemo commodi molestiae ab! Explicabo earum assumenda ut architecto quisquam.'
    }

]


const MainContent = (props) => {

    return(
        <div className="text-content">
            <h2>{data[props.subject].id + " " + data[props.subject].name}</h2>
            <p>{data[props.subject].text}</p>
            <div className="buttons">
                <Link to="/learn"><button>Learn</button></Link>
                <Link to="/practice"><button>Practice</button></Link>
                <Link to="/test"><button>Test</button></Link>
            </div>
            <div className='content-next'>
            <button onClick={()=>{props.handleSign(1);}} className='content-minus'>-</button>
            <h3>{data[props.subject].name}</h3>
            <button onClick={()=>{props.handleSign(2);}} className='content-plus'>+</button>
            </div>
        </div>
    )
}

export default MainContent