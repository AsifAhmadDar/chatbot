#Chatbot  

**Project Overview**

The Chat Widget is a real-time communication tool developed using
Angular for the front-end, Node.js (Express.js) in typescript for the
backend, MongoDB for data storage, and Socket.IO for enabling real-time
bidirectional event-based communication. The widget allows users to
initiate a chat with agents by entering their name and email. Agents are
notified of new chat requests, enabling them to join and engage in
conversations with users.

**Prerequisites**

Ensure the following software is installed before running up the Chatbot:

-   [Node.js](https://nodejs.org/)

-   [Angular CLI](https://cli.angular.io/)

-   [MongoDB](https://www.mongodb.com/try/download/community)

-   [npm](https://www.npmjs.com/) (Node Package Manager)

**Installation**

-   **Clone the repository:**

-   https://github.com/AsifAhmadDar/chatbot.git

1.  **Install Backend dependencies:**

2.  cd chatbot/server

3.  npm install

-   **Install Frontend dependencies:**

1.  cd chatbot/client-angular

2.  npm i

-   **Setup mongodb Compass and service:**

-   **Run the application:**

1.  ng serve for front end.

2.  npx nodemon for backend.

-   Acces application on **https://localhost:4200/**

-   Acces agent screen on **https://localhost:4200/agent**

**Backend Configuration**

-   Configure MongoDB connection in server/src/config.ts..

**Backend Structure**

The backend is built using Node.js and Express.js. Key components
include:

-   server.ts: Entry point for the Node.js server.

-   src/app.ts: Entry point for the express application.

-   src/routes/: Contains API routes for handling user and agent
    requests.

-   src/util/socket.util.ts: Manages Socket.IO connections for real-time
    communication.

-   src/service/service.ts: Manages socket io service for user updates
    and conversation updates

**Data Storage**

User details and conversations are stored in a MongoDB database.
Database schema information is available in src/data/models.
