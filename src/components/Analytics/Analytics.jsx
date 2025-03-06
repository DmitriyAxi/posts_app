import './Analytics.css'
import { useState, useEffect } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { ArcElement, Chart,LineElement, BarElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import Loader from '../Loader/Loader'

Chart.register(ArcElement, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function Analytics() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => { 
        const fetchPostsInfo = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('https://dummyjson.com/posts')
                const data = await response.json()
                setPosts(data.posts)
            } catch (error) {
                console.error('Ошибка получения постов.', error)
            }
            finally { setIsLoading(false) }
        }

        fetchPostsInfo();
    }, [])

    const postIds = posts.map(post => `${post.id}`);
    const likesData = posts.map(post => post.reactions.likes);
    const lineLikesData = {
        labels: postIds,
        datasets: [{
            label: 'Лайки',
            data: likesData,
            borderColor: 'rgba(54, 162, 235, 0.2)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }],
    };

    const dislikesData = posts.map(post => post.reactions.dislikes);
    const lineDislikesData = {
        labels: postIds,
        datasets: [{
            label: 'Дизлайки',
            data: dislikesData,
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        }],
    };

    const viewsData = posts.map(post => post.views);
    const barViewsData = {
        labels: postIds,
        datasets: [{
            label: 'Просмотры',
            data: viewsData,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 1)',
        }],
    };

    const totalLikes = posts.reduce((sum, post) => sum += post.reactions.likes , 0)
    const totalDislikes = posts.reduce((sum, post) => sum += post.reactions.dislikes , 0)
    const totalViews = posts.reduce((sum, post) => sum += post.views , 0)

    const dataForPie = {
        labels: ['Лайки', 'Дизлайки', 'Просмотры'],
        datasets: [
          {
            data: [totalLikes, totalDislikes, totalViews],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 4,
          },
        ],
    };

    return (
        <>
           <h3>Аналитика</h3>
           { isLoading && <Loader/>}
           { !isLoading && 
            <>
                <div className='analyticsSection'>
                    <div className='analyticsContainer'>
                        <Line data={lineLikesData}/>
                    </div>
                </div>
                <div className='analyticsSection'>
                    <div className='analyticsContainer'>
                        <Line data={lineDislikesData}/>
                    </div>
                </div>
                <div className='analyticsSection'>
                    <div className='analyticsContainer'>
                        <Bar data={barViewsData}/>
                    </div>
                </div>
                <div className='analyticsSection'>
                    <div className='analyticsContainer'>
                        <Pie data={dataForPie}/>
                    </div>
                </div>
            </>
            }
        </>
    )
}