# Task Manager

This is a full-stack task manager application built with Next.js, Tailwind CSS, and ShadCN. The backend is implemented using Next.js API routes.

## Features
- Create, update, delete, and view tasks
- Search functionality by title
- API integration with Next.js API routes

## Tech Stack
### Frontend
- Next.js Page Router
- Tailwind CSS
- ShadCN
- Axios for API Integration
- React Hook Form for form validation
- Sonner for toasts
- Date-fns for date formatting

### Backend
- Next.js API Routes
- MongoDB (via MongoDB Atlas)

## Project Architecture
The project follows a structured approach to maintain modularity and scalability.

### Folder Structure
```
/components
/constants
/layouts
/lib
/model
/pages
/public
/styles
```

### API Structure
The backend APIs are structured as follows:

- `index.js`: Handles fetching all tasks (`GET /api/tasks`) and creating a task (`POST /api/tasks`).
- `[id].js`: Handles fetching a specific task (`GET /api/tasks/:id`), updating a task (`PUT /api/tasks/:id`), and deleting a task (`DELETE /api/tasks/:id`).

The backend uses a MongoDB model to interact with the database and validate fields on the server side.

## Approach
- **Task List Page:** Fetches tasks using SWR for better UX, as SEO was not a priority.
- **Create Task Page:** Uses an Axios `POST` request to add new tasks.
- **Task Details Page:** Uses Incremental Static Site Generation (ISG) with `getStaticProps` to enhance the UX by generating a list of potential tasks on build time.
- **Edit Task Page:** Uses `getServerSideProps` for fetching the task and a `PUT` request for updates.
- **Delete Task:** Uses an Axios `DELETE` request to remove tasks.
- **Search Functionality:** Implemented on the frontend to filter tasks by title.

## Setup and Installation
Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```sh
   git clone https://github.com/rumaisanaveed/avancera-test.git
   cd avancera-test
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Setup MongoDB Atlas**
   - Create a MongoDB Atlas account.
   - Set up a new cluster and create a database named `TaskManager`.
   - Navigate to **Database Access** and create a new user with access.
   - Go to **Network Access** and allow access from your IP.
   - Copy the connection string from **Connect > Drivers > Node.js**.

4. **Configure Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following:
     ```sh
     MONGO_URL=<your-mongodb-connection-string>
     ```

5. **Run the Project**
   ```sh
   npm run dev
   ```

6. **Access the App**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Bonus Features
- Implemented search functionality.
- Implemented the Next.js API routes to build the backend.
