# Simple React Game with Node.js Backend

This project is a simple game built with **React.js** for the frontend and **Node.js/Express** with **Sequelize ORM** for the backend. The game allows users to play, track scores, and save their progress with features like user authentication, real-time score tracking, and persistent storage of high scores.

## Features

1. **Interactive Game**: A simple yet fun game (e.g., memory or number guessing) with a real-time score update.
2. **Score Tracking**: User scores are tracked during the game and displayed after each session.
3. **High Score Celebration**: When a user breaks their high score, a confetti animation is triggered.
4. **User Authentication**: Users can register and log in to track their progress across multiple sessions.
5. **Persistent Data Storage**: User details, scores, and high scores are saved in a database (MySQL/TiDB) with secure SSL connections.
6. **Leaderboard (Bonus)**: A leaderboard showing the top 10 users with the highest scores.
7. **Deployment**: Frontend is deployed on **Netlify/Vercel**, and backend is deployed on **Heroku/Railway**.

## Demo

[Play Game](https://shram.vercel.app/user/play_game)

## Tech Stack

### Frontend:
- **React.js**: Framework for building user interfaces.
- **SCSS**: Styling framework for the frontend.
- **Axios**: For HTTP requests to the backend.

### Backend:
- **Node.js**: JavaScript runtime for building the server-side.
- **Express.js**: Web framework for Node.js.
- **Sequelize**: ORM for database interactions.
- **MySQL/TiDB**: Database for storing user scores and info.
- **bcrypt**: For hashing passwords and secure user authentication.

### Deployment:
- **Frontend**: Deployed on **Vercel**.
- **Backend**: Deployed on **Render**.

## Installation

### Prerequisites:
- Node.js (v14 or above)
- MySQL or TiDB database instance
- Git

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/simple-react-game.git
   cd Shram-Task
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend` directory with the following details:

   ```env
   DB_USERNAME=<your-database-username>
   DB_PASSWORD=<your-database-password>
   DB_NAME=<your-database-name>
   DB_HOST=<your-database-host>
   DB_PORT=3306
   SALT_ROUNDS=10
   ```

4. **Run Backend Server**:
   Make sure to have MySQL/TiDB running.
   ```bash
   npm run dev
   ```

5. **Install Frontend Dependencies**:
   Open a new terminal and navigate to the `frontend` directory.
   ```bash
   cd ../frontend
   npm install
   ```

6. **Configure Frontend Environment Variables**:
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_APP_BACKEND_URL=http://localhost:9000
   ```

7. **Run Frontend App**:
   ```bash
   npm run dev
   ```

8. **Deployment**:
   - For **frontend**, use [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
   - For **backend**, deploy to [Heroku](https://www.heroku.com/) or [Railway](https://railway.app/).

## How to Play

- **Login/Register**: Start by creating a user account or logging in.
- **Play Game**: Play the game by following the in-game instructions. Your score will update in real-time.
- **High Score Celebration**: If you break your previous high score, a confetti animation will appear.
- **View Scores**: After the game, view your current and high scores, and choose to play again.

## Database Models

### `User` Model
- **user_id** (UUID, Primary Key)
- **first_name** (String)
- **last_name** (String)
- **primary_email** (String)
- **password** (String, hashed)
- **role** (String)
- **profile_picture** (String)

### `Score` Model
- **score_id** (UUID, Primary Key)
- **user_id** (Foreign Key to User)
- **score** (Integer)
- **remarks** (String, "Good", "Bad", or "Best")
- **created_at** (Timestamp)
- **updated_at** (Timestamp)

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: User login.

### Game
- **POST** `/api/game/score`: Submit score after the game session.
- **GET** `/api/game/scores`: Fetch user's past scores and high scores.

## Roadmap

- [ ] Add more games or levels to the existing game.
- [ ] Implement advanced animations and visual effects.
- [ ] Add a global leaderboard for top 10 scores.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
