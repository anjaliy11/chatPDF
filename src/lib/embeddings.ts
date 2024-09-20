import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

async function delay(ms: number) {
return new Promise(resolve => setTimeout(resolve, ms));
}


export async function getEmbeddings(text: string, retries = 5, backoff = 1000): Promise<number[]> {
try {
    const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text.replace(/\n/g, " "),
    });

    if (!response.ok) {
    if (response.status === 429 && retries > 0) {
        // Too many requests, retry with exponential backoff
        await delay(backoff);
        return getEmbeddings(text, retries - 1, backoff * 2);
    }
    throw new Error(`OpenAI API responded with status ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.data && result.data.length > 0) {
    return result.data[0].embedding as number[];
    } else {
    throw new Error("No embedding data received from OpenAI API");
    }
} catch (error) {
    console.error("Error calling OpenAI Embeddings API:", error);
    throw error;
}
}
