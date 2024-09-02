import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/post`, {
            method: "GET",
            credentials: 'include',
        }
        ).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, [posts]);
    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post}/>
            ))}
        </>
    );
}