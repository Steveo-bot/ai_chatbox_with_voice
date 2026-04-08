import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

//Note: change this default filePath. to any of your default file name
const chat = async (filePath = "./uploads/hbs-lean-startup.pdf", query) => {
    //get API
    const apiKey = process.env.OPENAI_API_KEY;

    //step1:
    const loader = new PDFLoader(filePath);
    const data = await loader.load();

    //step2:
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 0,
    });

    const splitDocs = await textSplitter.splitDocuments(data);
    
    //step3:
    //what does this do? it creates a new instance of the OpenAIEmbeddings class, 
    // which is used to generate embeddings for the documents. 
    // The embeddings are a way to represent the documents in a vector space, which can be used for various tasks 
    // such as similarity search or clustering.
    const embeddings = new OpenAIEmbeddings(apiKey ? {apiKey} : {});
    const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
    
    //step4, we need a retriever to retrieve relevant documents based on the query.
    //const relevantDocs = await vectorStore.similaritySearch("what is task decomposition?");

    //step5, customize teh prompt
    const model = new ChatOpenAI({
  model: "gpt-5",
  apiKey,
});

    //step6, the prompt for better retrieval, we want to provide the relevant documents as 
    // context to the model, so it can generate a more accurate answer.
const prompt = PromptTemplate.fromTemplate(`
Use the following pieces of context to answer the question at the end.
If you don't know the answer, say that you don't know.
Use three sentences maximum and keep the answer concise.
Context: {context}
Question: {question}
Helpful Answer:
`);
    //use retriever to get relevant documents
    const retriever = vectorStore.asRetriever();
    const relevantDocs = await retriever.invoke(query);

    //format context from retrieved documents
    const context = relevantDocs.map(doc => doc.pageContent).join("\n\n");
    //create a simple chain using prompt template
    const formattedPrompt = await prompt.format({
        context,
        question: query,
    });
    //get response from the model
    const response = await model.invoke(formattedPrompt);
    return {text: response.content};
};

export default chat;