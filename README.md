# ASCIIUM

## Summary

ASCIIUM lets you capture live webcam video and transform it into stylized ASCII art in real-time. Save your unique creations and explore the art of interactive ASCII. Users can choose between different ASCII styles. Save the creations to a database. See all the creations on the home page.

## Table of Contents

- [ASCIIUM](#asciium)
  - [Summary](#summary)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
  - [API Endpoints](#api-endpoints)
    - [GET `/api/ascii`](#get-apiascii)
    - [POST `/api/ascii`](#post-apiascii)
    - [PUT `/api/ascii/:id`](#put-apiasciiid)
    - [DELETE `/api/ascii/:id`](#delete-apiasciiid)
    - [HTTP Codes](#http-codes)
  - [A11y and SEO](#a11y-and-seo)
  - [Tracking](#tracking)
    - [The app is measuring:](#the-app-is-measuring)
  - [GDPR](#gdpr)
  - [Security](#security)
    - [Vulnerabilities Addressed](#vulnerabilities-addressed)
      - [1. A03:2021 – Injection](#1-a032021--injection)
        - [1.1 Mitigation](#11-mitigation)
          - [1.1.1 express-mongo-sanitize](#111-express-mongo-sanitize)
          - [1.1.2 express-validator](#112-express-validator)
      - [2. A07:2021 – Identification and Authentication Failures](#2-a072021--identification-and-authentication-failures)
        - [2.1 Mitigation](#21-mitigation)
  - [How to Run](#how-to-run)
    - [1. Clone the repo](#1-clone-the-repo)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Create a .env file](#3-create-a-env-file)
    - [4. Start Asciium](#4-start-asciium)
    - [5. Open in Browser](#5-open-in-browser)

## Tech Stack

### Frontend

- React + Vite

### Backend

- Express.js
- Node.js

### Database

- MongoDB

## API Endpoints

### GET `/api/ascii`

Retrieves all ASCII art entries from the database.

**Response**

- Success (200):

### POST `/api/ascii`

Creates a new ASCII art entry.

**Request Body**

```json
{
	"title": "My ASCII Art",
	"content": ": )"
}
```

**Response**

- Success (201):

### PUT `/api/ascii/:id`

Updates an existing ASCII art entry Title by ID.

**Request Parameters**

- `id`: MongoDB ObjectId of the ASCII art to update

**Request Body**

```json
{
	"title": "Updated ASCII Art",
	"content": "New ascii here"
}
```

**Response**

- Success (200):

### DELETE `/api/ascii/:id`

Deletes an ASCII art entry by ID.

**Request Parameters**

- `id`: MongoDB ObjectId of the ASCII art to delete

**Response**

- Success (200):

### HTTP Codes

| Status Code | Description  |                                                  |
| ----------- | ------------ | ------------------------------------------------ |
| 200         | OK           | Request was successful                           |
| 201         | Created      | New ASCII art entry was successfully created     |
| 400         | Bad Request  | Missing required fields (title or content)       |
| 404         | Not Found    | Invalid ASCII art ID provided                    |
| 500         | Server Error | Database connection issues or server-side errors |

## A11y and SEO

A11y: Followed best practices for web accessibility. This includes using Lighthouse and Axe DevTools to run accessibility testing. Also using semantic HTML elements where its applicable. Choose to use Shadcn components which rely on Radix, which handles focus management, screen-reader compatibility, and compliance with relevant accessibility guidelines such as color contrast. Provided keyboard navigation using `tab`, `enter` and `esc` keys, to support users interacting with the webapp without a mouse.

SEO: Added a meta description which provides a summary of the project to increase search traffic. It also helps the search engines understand and rank the webapp higher.

## Tracking

This project uses **Google Analytics** via `gtag` to understand overall traffic and feature usage. The goal is to gather general insights into how the application is being used to inform future improvements. The tracking only collects **anonymous** user data, the data points are listed below.

#### The app is measuring:

- Page views
- Scrolls
- Outbound clicks
- Site Search
- Form interactions

## GDPR

> [!NOTE]
> By using ASCIIUM, users **agree** that their generated **ASCII** **art** with a **creation** and an **updated** date will be stored in the application's database. This storage is necessary to provide the core functionality of saving and displaying user creations. No personal information is saved, IF you do not take a identifiable ASCII selfie : )

## Security

Checked OWASP top 10 list of web application security risks.

### Vulnerabilities Addressed

#### 1. A03:2021 – Injection

ASCIIUM was vulnerable to NoSQL injection, where malicious code could be injected into database queries through user-supplied input.

##### 1.1 Mitigation

###### 1.1.1 express-mongo-sanitize

Input sanitization, the middleware automatically sanitizes all user-supplied input (found in request bodies, query strings, and parameters) by removing or escaping any MongoDB operator symbols (e.g., $where, $gt, $lt) that could be used by an attacker to manipulate the intended database query. This effectively neutralizes any attempts to inject malicious code through these operators.

###### 1.1.2 express-validator

Input validation specifically within ascii controller logic (in the createAscii and updateAscii functions), we define validation rules for each input field (title and content). The rules ensure that the input conforms to the expected data type, format, and length. express-validator's escape() function is used to sanitize input by converting potentially harmful characters (e.g., <, >, &, ', ") into their HTML entity equivalents. This prevents these characters from being interpreted as code by the database or the application.

#### 2. A07:2021 – Identification and Authentication Failures

The lack of authentication means that the application essentially operates without any concept of user identity. There are no login mechanisms, no user accounts, and no verification processes in place. This is not ideal. And means any visitor, can perform all core data manipulation operations, such as:

- Create new ASCII art entries, potentially flooding the database with spam or inappropriate content.

- Read any existing ASCII art, including those created by other users.

- Update any ASCII art title, allowing alteration of other users' title creations.

- Delete any ASCII art entry, potentially leading to the loss of valuable user-generated content.

##### 2.1 Mitigation

A key mitigation is implementing auth. This would verify user identities, controlling access and actions based on roles.

## How to Run

### 1. Clone the repo

```bash
git clone https://github.com/maybejod/asciium.git
```

Navigate into the project folder:

```bash
cd asciium
```

### 2. Install Dependencies

Install dependencies for both the frontend and backend from the root directory. This script installs dependencies for both the frontend and backend folders. Also builds the project

Run the this command:

```bash
npm run build
```

Alternatively manually install dependencies for each directory `backend` and `frontend`:

```bash
# Install backend dependencies asciium/
npm install

# Install frontend dependencies asciium/frontend
cd ../frontend
npm install
```

### 3. Create a .env file

You will need a .env file in the root directory with:

- `MONGO_URI=yourmongouri`
- `PORT=portnumber`

### 4. Start Asciium

> [!NOTE]
> If you ran `npm run build` from the root directory then use the following command to start both the backend and frontend simultaneously:

```bash
npm run start
```

> [!NOTE]
> If **I** have **succeeded** to deploy this webapp then this works. **If not** the server will not work and you have to start the dev servers individually.

This will:

- Serve the server and frontend under `http://localhost:4000.` and you can run the webapp under `localhost:4000`
- Use the production API URL for requests

Alternatively, you can start them individually:

```bash
# Start backend server from the root
npm run dev

# Start frontend server in a separate terminal
cd ../frontend
npm run dev
```

### 5. Open in Browser

Once both servers are running:

- Open your browser and navigate to http://localhost:5173 to access the ASCIIUM.
