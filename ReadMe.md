# Realm of Cards Backend

A comprehensive Node.js backend server for the Realm of Cards game - a strategic card battle game with real-time multiplayer capabilities, user management, and complex game mechanics.

## 🎮 Game Overview

Realm of Cards is a strategic card battle game where players:
- Collect and manage card decks
- Battle against other players or AI opponents
- Equip cards with special equipment
- Unlock and use powerful abilities
- Progress through different levels
- Build friendships and compete in real-time battles

## 🏗️ Architecture
The backend follows a clean MVC architectur

## 🚀 Key Features

### **Authentication System**
- JWT-based authentication with [`authMiddleware`](src/middlewares/authMiddleware.js)
- Google Play Games integration for mobile users
- Admin authentication for game management

### **Card System**
- **Base Cards**: Template cards with predefined stats (`baseAttack`, `baseBlood`, `abilities`)
- **User Cards**: Player-owned instances with individual stats and equipment
- **Random Card Generation**: Players can get random cards from the collection
- **Image Upload**: Support for card artwork via base64 encoding

### **Battle System**
- Real-time multiplayer battles using Socket.io
- Offline battles against AI opponents with [`BotHandler`](src/classes/battle/BotHandler.js)
- Turn-based combat mechanics
- Card abilities and equipment effects

### **Equipment & Abilities**
- Equipment items that modify card stats
- JavaScript function-based ability system
- Equipment compatibility with specific card types

### **File Management**
- Automatic image storage for cards and abilities
- Static file serving from [`/data`](src/data/) directory
- PNG image generation from base64 uploads

## 📡 API Endpoints

### **Authentication**
```
POST /api/users/login - User login
POST /api/users/login/googlePlay - Google Play Games login
POST /api/admin/login - Admin authentication
```

### **Card Management**
```
GET /api/cards/names - Get all card names
GET /api/cards/:cardId - Get card details
POST /api/cards - Create new card (with image upload)
```

### **User Cards**
```
GET /api/user-cards - Get all user cards
POST /api/user-cards/randomOne - Get random card
POST /api/user-cards - Create user card
```

### **Battle System**
```
POST /api/battleSession - Create battle session
```

## 🛠️ Technologies Used

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **File Upload**: Multer middleware
- **Real-time Communication**: Socket.io
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Security**: HTTPS with custom certificates in [`node_certifs/`](node_certifs/)

## 📦 Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd GameBackend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Environment Setup**:
Create a [`.env`](.env) file with:
```env
PORT_NUMBER=3000
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin_password
DATABASE_URL=mongodb://localhost:27017/realm-of-cards
```

4. **Database Setup**:
Configure MongoDB connection in [`Config/database.js`](Config/database.js)

5. **Start the server**:
```bash
npm run start
```

## 🎯 Game Flow

1. **User Registration/Login**: Players create accounts or login via Google Play
2. **Card Collection**: Users collect cards through random generation
3. **Deck Building**: Players organize cards into battle-ready decks
4. **Equipment**: Cards can be enhanced with equipment items
5. **Battles**: Real-time or offline battles against other players/AI
6. **Progression**: Unlock new levels, abilities, and cards

## 📊 Database Schema

The game uses a relational approach with the following key entities:
- **Users** with profiles, friends, and card collections
- **Cards** as templates with abilities and equipment compatibility
- **UserCards** as player-owned instances with individual stats
- **Decks** containing collections of UserCards
- **Equipment** items that modify card capabilities

## 🔧 Development

- **Testing**: Run `npm test` to execute Jest test suites
- **API Documentation**: Access Swagger docs at `/api-docs` when server is running
- **File Structure**: Well-organized MVC architecture in [`src/`](src/) directory
- **Code Coverage**: Generate reports in [`coverage/`](coverage/) directory

## 👨‍💻 Author

**Ouadie ZERHOUNI**
- Created: January 28, 2024
- License: CC BY-NC-SA 4.0 (Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International)

## 🎮 Game Mechanics

- **Turn-based Combat**: Strategic card placement and attacks
- **Ability System**: JavaScript-based special effects
- **Equipment Enhancement**: Modify card stats and abilities
- **Real-time Multiplayer**: Socket.io powered battles
- **AI Opponents**: Intelligent bot behavior for offline play

This backend provides a robust foundation for a complex card battle game with modern web technologies and scalable architecture.