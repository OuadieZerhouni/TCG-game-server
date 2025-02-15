# Realm of Cards Backend

This is the backend server for the Realm of Cards game, built using Node.js, Express, and MongoDB. It provides APIs for managing users, decks, cards, levels, and more.


## Installation

1. Clone the repository:
```
git clone https://github.com/your-repo/realm-of-cards-backend.git
```
```
    cd realm-of-cards-backend
    ```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
    Create a [`.env`](.env ) file in the root directory and add the necessary environment variables.

4. Start the server:
```
npm run start
```

## API Documentation

The API is documented using Swagger. You can access the API documentation at `/api-docs` once the server is running.

## Key Components

- **Controllers**: Handle incoming requests and return responses.
- **Services**: Contain business logic and interact with the database.
- **Models**: Define the data schema using Mongoose.
- **Routes**: Define the API endpoints and map them to controllers.
- **Middlewares**: Handle authentication, validation, and other request processing tasks.
- **Socket**: Manage real-time communication using Socket.io.

## Testing

Run tests using Jest:
```
npm test
```

## Authors

- Ouadie ZERHOUNI

## License

This project is licensed under the ISC License.