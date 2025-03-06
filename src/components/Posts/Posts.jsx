import { useState, useEffect } from 'react'
import FilterPosts from '../FilterPosts/FilterPosts'
import Loader from '../Loader/Loader'
import PostCard from '../PostCard/PostCard'
import './Posts.css'

export default function Posts() {
    const [posts, setPosts] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [activeTag, setActiveTag] = useState(null)
    const [errorPosts, setErrorPosts] = useState("")

    useEffect(() => { 
        const fetchPosts = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('https://dummyjson.com/posts')
                const data = await response.json()
                setPosts(data.posts)
            } catch (error) {
                setErrorPosts('Ошибка при получении информации о посте.')
            }
            finally { setIsLoading(false) }
        }

        fetchPosts();
    }, [])

    const uniqueTags = 
        posts.filter(post => post && Array.isArray(post.tags)).map((post => post.tags)).reduce((uniqueTags, postTags) => {
            for (const postTag of postTags) {
                !uniqueTags.includes(postTag) && uniqueTags.push(postTag)
            }
            return uniqueTags
        }, [])

    const handleChooseTag = (tag) => {
        if (tag === 'All') {
            setActiveTag(null); 
        } else if (activeTag === tag) {
            setActiveTag(null); 
        } else {
            setActiveTag(tag); 
        }
    }

    const filteredPosts = 
        activeTag
        ? posts.filter(post => post.tags.includes(activeTag))
        : posts;

    const tagsWithAll = ['All', ...uniqueTags];
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
            {errorPosts && <p style={{color: 'red'}}>Что-то пошло не так. {errorPosts}</p>}
            <div className='container'>
                {filteredPosts.map(post => 
                <PostCard 
                    key={post.id}
                    post={post}>
                </PostCard>)}
            </div>
            <Loader isActive={isLoading}></Loader>
        </>
    )          
}