import React, { useEffect, useState } from 'react'
import useStatus from '../hooks/useStatus'
import { getMovies } from '../api/Movies';
import Background from '../Components/Background';
import SlidingWindow from '../Components/SlidingWindow';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const IMG_URL = 'http://image.tmdb.org/t/p/original'

const Home = () => {
    const { isLoading, setLoading, setIdle } = useStatus();
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading();
        getMovies()
            .then(res => {
                console.log(res);
                setMovies(res);
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => setIdle())
    }, [])
    
    if(isLoading){
        return <h1>Loading...</h1>
    }

    const randomMovie = getRandomMovie(movies);
    const movieBackdrop = `${IMG_URL}${randomMovie?.backdrop_path}`

    return (
        <div>
            <Navbar/>
            <section className='section-main'>
                <Background img={movieBackdrop} className={'justify-end section-main'}>
                    <div className="bottom-2 left-0 p-3 z-10 sm:p-5 md:p-7 lg:p-12 mb-5">
                        <p className='text-xl text-white sm:text-3xl md:text-5xl lg:my-4'>{randomMovie?.title}</p>
                        <p className="text-sm text-yellow-500 sm:text-lg">Rating: {randomMovie?.vote_average}</p>
                        <p className="text-white md:block hidden my-3 max-w-[70%]">{randomMovie?.overview}</p>
                    </div>
                </Background>
            </section>
                <div className="pt-10">
                    {
                        movies?.map((section) => {
                            return <SlidingWindow value={section.data} title={section.title} key={section.title} className='lg:w-[85%] md:w-[90%] sm:w-[93%] mx-auto mb-3 md:mb-16 sm:mb-10' type={1} clickFunc={(id) => navigate(`/home/movies/${id}`)} />
                        })
                    }
                </div>
        </div>
    )
}

function getRandomMovie(movies) {
    if(movies.length === 0) return {}
    let i = Math.round(Math.random() * (movies.length - 1))
    let j = Math.round(Math.random() * (movies[i].data.length - 1))
    return movies[i].data[j]
}


export default Home
