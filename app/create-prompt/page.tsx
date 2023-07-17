'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from 'axios';
import Form from "@components/Form";
import { useRouter } from 'next/navigation'

export interface Post {
    prompt: string,
    tag: string
}

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    } as Post);

    const { data: session } = useSession();
    const router = useRouter();

    const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            const response = await axios.post('/api/prompt/new', {
                userId: session?.user?.id,
                prompt: post.prompt,
                tag: post.tag
            });

            if (response.status === 201) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
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