'use client'

import { useState, useEffect } from "react";

import PromptCard from './PromptCard';


const Feed = () => {

    const [searchText,setSearchText] = useState<string>(""); 
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
        }
    },[]);


    interface PromptCardListProps{
        data: any[],
        handleTagClick: any
    }



    const PromptCardList:React.FC<PromptCardListProps> = ({data,handleTagClick}) => {
        return (<div className="mt-16 prompt_layout">

        </div>)
    }


    const handleSearchChange = () => {

    };

    return (<section>
        <form className="relative w-full flex-center">
            <input 
                type="text"
                placeholder="Search for a tag or a username"
                value={searchText}
                onChange={handleSearchChange}
                required
                className="search_input peer"  />  
        </form>   
        <PromptCardList 
            data={[]}
            handleTagClick={() => {}}/> 
    </section>)
}

export default Feed;