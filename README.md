# Tic-Tac-Toe Game with User Authentication

## Overview

This project is a simple web application implementing a Tic-Tac-Toe game using Flask, MongoDB, HTML, CSS, and JavaScript. It includes user authentication features with registration and login functionality. Users can play the Tic-Tac-Toe game, track their wins, and log out. 

The project leverages AI tools like ChatGPT and Amazon Q for assistance in coding, debugging, and development.

## Features

- **User Authentication**: Allows users to register and log in.
- **Tic-Tac-Toe Game**: 3x3 grid game where users can play Tic-Tac-Toe.
- **Win Tracking**: Keeps track of the number of wins for each user.
- **Logout Functionality**: Users can log out and return to the login page.

## Prerequisites

Before setting up the project, ensure you have the following installed:

1. **Python 3.7 or later**: Download from [python.org](https://www.python.org/).
2. **MongoDB**: Download and install from [mongodb.com](https://www.mongodb.com/try/download/community).

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/mohit-pythondev/Tic-Tac-Toe.git
    cd Tic-Tac-Toe
    ```

2. **Create and Activate a Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set Up Environment Variables**:
    - Create a `.env` file in the root directory and add your secret key:
      ```env
      FLASK_SECRET_KEY=your_secret_key
      ```

5. **Run the Flask Application**:
    ```bash
    python app.py
    ```

6. **Access the Application**:
    - Open a web browser and go to [http://127.0.0.1:5000](http://127.0.0.1:5000).

## File Structure

- `app.py`: Main Flask application file with routes and logic.
- `requirements.txt`: Lists the Python dependencies required for the project.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `templates/`: Contains HTML templates.
  - `login.html`: HTML for the login page.
  - `index.html`: HTML for the main page where the Tic-Tac-Toe game is displayed.
- `static/`: Contains static files such as CSS and JavaScript.
  - `css/`: Stylesheets (if any).
  - `js/`: JavaScript files.
    - `login.js`: JavaScript code for handling login form submission.
    - `script.js`: JavaScript code for the Tic-Tac-Toe game logic.

## Usage

- **Register**: Navigate to the `/register` page to create a new account.
- **Login**: Go to the `/login` page to log in with your credentials.
- **Play Tic-Tac-Toe**: After logging in, play Tic-Tac-Toe on the main page (`/`).
- **Logout**: Click the logout button to end your session and return to the login page.

## AI Tools Used

This project utilized the following AI tools for development:

- **ChatGPT**: Provided code generation, debugging assistance, and general development advice.
- **Amazon Q**: Used for querying and obtaining information related to application development.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes. Follow the coding style and ensure your changes are well-documented.


## Repository

- **GitHub Repository**: [Tic-Tac-Toe](https://github.com/mohit-pythondev/Tic-Tac-Toe)
