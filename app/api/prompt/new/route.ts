import { connectToDB } from "@utils/database";
import { NextApiRequest } from "next";

import Prompt from "@models/prompt";

export const POST = async (req : NextApiRequest) => {
    const {userId,prompt,tag} = await req.body;

    try{
        // dies after doing its job like lambda function
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status: 201});
    }catch(error){
        return new Response("Failed to create a new prompt",{status: 500});
    }
}