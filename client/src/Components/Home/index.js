import { useContext } from 'react'
import './index.scss'
import { UserContext } from '../../Context/UserContext'

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <div className='Home'>
                { user }
            </div>
        </>
    )
}

export default Home