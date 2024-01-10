<h1 align="center">Custom-GPT🚀</h1>

### Overview📖  

Custom-GPT is an advanced chatbot application utilizing a customized GPT-4 model, specifically tailored to provide in-depth understanding and assistance based on the book "Introduction to Machine Learning" by Ethem Alpaydin. This repository contains all the necessary code and instructions to deploy and interact with the Custom-GPT model.

### Key Features🔑

Custom GPT-4 Model: Leveraging OpenAI's Assistant Playground, the GPT-4 model is fine-tuned to focus on the content of Ethem Alpaydin's "Introduction to Machine Learning."
Specialized Knowledge Base: Ideal for students preparing for exams, the model provides detailed explanations and answers relevant to the book's content.
Versatile Answering Capability: If a query falls outside the book's scope, Custom-GPT utilizes the latest GPT-4-1106-preview knowledge (up to April 2023) for more general responses.
Independent Prompt Handling: Each user prompt initiates a new thread, ensuring focused and relevant responses without the influence of previous interactions.


### Getting Started🌟  

### Prerequisites🛠️

Ensure you have npm and Node.js installed on your system.

#### Installation📦

Clone the repository to your local machine

```bash
git clone https://github.com/jforjay1/Custom-GPT.git
```

Open two terminals in Custom-GPT directory to deploy the application.

In the 1st Terminal:

```bash
cd ethem-alpaydin-gpt
npm start
```
In the 2nd Terminal:

```bash
cd gpt-backend
node index.js
```

It will automatically take you to http://localhost:3000 if it does not then open the URL in your favourite browser.


### Improvements and Future Scope🌱

-Continuous Conversation: Implement a feature to maintain the same chat thread for a continuous conversation flow.
- Reset Button: Add functionality to initiate a new thread, allowing users to start fresh conversations.
- User Accounts: Introduce user account settings for unique user identification.
- Chat History: Provide options to view and resume from past conversations.
- The application has the potential to evolve into a full-scale solution, with endless possibilities for new features and enhancements.

### Use Cases🤖
- Enhanced Chatbot: AI-enabled for intelligent and responsive user interactions.
- Document Automation: Streamline document processing with AI assistance.
- Knowledge-Specific Queries: Get accurate answers based on the specialized knowledge base.
- Personal Assistant: Aid in various personal and educational tasks.
- Development Companion: Assist developers with coding and technical queries.

### Contributors 🌍
This project thrives on collaboration and contributions from the community. We are grateful to the following contributors for their invaluable input and dedication:

<a href="https://github.com/jforjay1/Custom-GPT/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jforjay1/Custom-GPT&anon=0" />
</a>

Want to contribute? Feel free to submit a pull request or raise an issue. Let's work together to enhance Custom-GPT's capabilities! Together, we can make Custom-GPT an even more powerful and versatile tool. 🌟👩‍💻👨‍💻🚀 For any questions or suggestions, don't hesitate to reach out or contribute.
