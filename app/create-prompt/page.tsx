'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";

import Form from "@components/Form";
import { Session } from "inspector";

export interface Post{
    prompt: string,
    tag: string
}

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    } as Post);

    const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitting(true);

        try{
            const response = await fetch('/api/prompt/new',{
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok){
                router.push('/');
            }
        }catch(error){
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }


    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt;