# School User Ranking Website

This project is a web application designed to rank users in a school based on specific criteria. The application uses Deno for the backend and React with Vite (TypeScript) for the frontend.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Description

The School User Ranking Website allows users to log in using their credentials, fetches user data from an external API, and displays rankings based on various metrics. The backend handles authentication, data fetching, and database operations, while the frontend provides a responsive and interactive user interface.

Key features include:
- OAuth authentication with 42 API.
- Fetching and displaying user data from an external API.
- Storing user data and campus information in a JSON database.
- Ranking users based on criteria like level and campus.
- Interactive and responsive UI built with React and Vite.

## Installation

### Prerequisites

- [Docker](https://www.docker.com/)

### Setup

Clone the repository:

```sh
git clone https://github.com/Labrahmi/1337Rank.git
cd 1337Rank
```

Start the application using Docker Compose:

```sh
docker-compose up --build
```

This command will build and start both the backend and frontend services. The backend will be available at `http://localhost:8000` and the frontend at `http://localhost`.

## Usage

### Accessing the Application

Open your browser and navigate to `http://localhost`.

### Authentication and Data Fetching

1. Log in using your credentials.
2. The application will fetch your data from the external API.
3. User data and campus information will be stored in the backend database.
4. Rankings will be displayed on the frontend based on the fetched data.

## Project Structure

```
.
├── app
│   ├── deno.lock
│   ├── index.html
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── 42_logo.png
│   │   ├── back.png
│   │   ├── cat.png
│   │   ├── chess-8348280.jpeg
│   │   ├── chess-8348280_trans.png
│   │   ├── profile.png
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── assets
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── pages
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── backend
│   ├── api
│   │   └── db
│   ├── db
│   │   ├── campus.json
│   │   └── promo.json
│   ├── deps.ts
│   ├── Dockerfile
│   └── main.ts
└── docker-compose.yml
```

## Environment Variables

The following environment variables need to be set in the `backend/.env` file:

- `UID`: Your client ID
- `SECRET`: Your client secret
- `REDIRECT_URI`: The redirect URI for OAuth
- `BASE_URL`: The base URL for the API

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
