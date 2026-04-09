# Agent-Based Question Answering System with Voice Input
### contributor: Steve Zhao, a second-year student at UCSB


<img width="824" height="431" alt="Screenshot 2026-04-09 at 13 19 52" src="https://github.com/user-attachments/assets/b137da0c-3af7-4979-8925-e2f3ba4ad3e4" />

## Framework
<img width="555" height="156" alt="Screenshot 2026-04-09 at 13 19 05" src="https://github.com/user-attachments/assets/267ea053-2365-4230-924a-cbea98ab0335" />

## Features
- Upload PDF documents for analysis
- Ask questions about the uploaded PDF content
- Receive generated answers based on the document
- Use voice input to ask questions
- Listen to answers with text-to-speech output
- Get additional answers from online search
- 
## Overview
This is a agent-based system that can answer questions based on the retrieved documents. The system is built using React for the frontend and Node.js for the backend. The backend uses OpenAI's GPT-5 model for natural language processing and Serapi for document retrieval. The project also includes a vector store for storing and retrieving relevant documents based on similarity search. The README should include instructions on how to set up the project, how to run the server and the frontend, and how to use the system to ask questions and get answers based on the retrieved documents.


## Instructions
To set up and run the project, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory and install the dependencies for both the frontend and backend:
    - For the backend, navigate to the `server` directory and run `npm install`.
    - For the frontend, navigate to the `client` directory and run `npm install`.
3. Set up the environment variables:
    - Create a `.env` file in the `server` directory and add your OpenAI
        API key and Serapi key as follows:
        ```
        OPENAI_API_KEY=your_openai_api_key
        SERAPI_KEY=your_serapi_key
        ```
4. Start the backend server:
    - Navigate to the `server` directory and run `npm start`. The server will start
        on port 5001.
5. Start the frontend:
    - Navigate to the `client` directory and run `npm start`. The frontend will start
        on port 3000.
6. Open your browser and go to `http://localhost:3000` to access the application.
7. Use the interface to ask questions. The system will retrieve relevant documents based on your question and provide answers using the GPT-5 model.        
