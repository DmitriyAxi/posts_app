import { useState, useEffect } from 'react'
import FilterPosts from '../../components/features/FilterPosts/FilterPosts'
import Loader from '../../components/shared/Loader/Loader'
import PostCard from '../../components/features/PostCard/PostCard'
import './Posts.css'
import { API_URL_DUMMY } from '../../constants/api'

export default function Posts() {
    const [posts, setPosts] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [activeTag, setActiveTag] = useState(null)
    const [errorPosts, setErrorPosts] = useState("")

    const uniqueTags = 
        posts.filter(post => post && Array.isArray(post.tags)).map((post => post.tags)).reduce((uniqueTags, postTags) => {
            for (const postTag of postTags) {
                !uniqueTags.includes(postTag) && uniqueTags.push(postTag)
            }
            return uniqueTags
        }, [])

    const filteredPosts = 
        activeTag
        ? posts.filter(post => post.tags.includes(activeTag))
        : posts;

    const tagsWithAll = ['All', ...uniqueTags];

    const handleChooseTag = (tag) => {
        if (tag === 'All') {
            setActiveTag(null); 
        } else if (activeTag === tag) {
            setActiveTag(null); 
        } else {
            setActiveTag(tag); 
        }
    }

    useEffect(() => { 
        const fetchPosts = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${API_URL_DUMMY}/posts`)
                const data = await response.json()
                setPosts(data.posts)
            } catch (error) {
                setErrorPosts('Ошибка при получении информации о посте.')
            }
            finally { setIsLoading(false) }
        }

        fetchPosts();
    }, [])
    return (
        <>  
            <div className='filterContainer'>
                {!isLoading && tagsWithAll.map(tag => 
                    <FilterPosts 
                        key={tag} 
                        tag={tag} 
                        isActive={tag === 'All' ? activeTag === null : activeTag === tag} 
                        onTagClick={() => handleChooseTag(tag)}
                    />)}
            </div>
            {errorPosts && <p className='errorText'>Что-то пошло не так. {errorPosts}</p>}
            <div className='container'>
                {filteredPosts.map(post => 
                <PostCard 
                    key={post.id}
                    post={post}/>
                )}
            </div>
            <Loader isActive={isLoading}/>
        </>
    )          
}