# Virtual Study Buddy Web App

This is a web application built with [Next.js](https://nextjs.org/) that serves as a virtual study buddy platform where users can interact, track their study progress, and collaborate with others.

## Features

- **User Authentication**: Register and log in using secure authentication.
- **Study Groups**: Create and join study groups with like-minded learners.
- **Real-time Chat**: Communicate with study buddies through real-time chat.
- **Task Tracker**: Track your study tasks, set deadlines, and monitor progress.
- **Daily Goals**: Set and accomplish daily study goals.
- **AI-powered Suggestions**: Get study recommendations and tips from an AI-powered assistant.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React Framework)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for styling.
- **Backend**: [Node.js](https://nodejs.org/) with RESTful API.
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/).
- **Authentication**: [NextAuth](https://next-auth.js.org/) for secure authentication.
- **WebSocket**: [Socket.io](https://socket.io/) for real-time chat functionality.
- **AI Assistant**: [OpenAI API](https://beta.openai.com/docs/) for study suggestions.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/virtual-study-buddy.git
    ```
2. Navigate into the project directory:
    ```bash
    cd virtual-study-buddy
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables by creating a `.env.local` file in the root directory and adding the following:
    ```bash
    NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
    MONGODB_URI=your-mongodb-uri
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

Feel free to submit issues or pull requests! Contributions are always welcome.

## License

This project is licensed under the MIT License.
