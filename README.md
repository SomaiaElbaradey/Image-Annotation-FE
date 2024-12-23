# FE - Image Annotation

## Developer Challenge
This project is a simple frontend application that enables end users to annotate images by drawing rectangles, adding text annotations, and saving their work. The application also includes task management functionality and authentication.

---

## Features Completed

### 1. Image Annotation Interface:
- Users can draw rectangles using the mouse or touchscreen.
- Users can write annotations for each rectangle.
- Annotations and rectangles persist when the user revisits the task.
- Enable rendering saved annotations back on the image.
- Provide a “Next” button to save the current annotation and move to the next assigned task.

### 2. Error Handling:
- Display clear error messages for scenarios like:
  - Invalid credentials during login.

### 3. Security:
- Restrict access to tasks based on user authentication.
- Secure Firebase rules to ensure users cannot access unauthorized data.

### 4. Firebase Integration:
- **Authentication:** Implemented using email/password authentication.
- **Database:** Firebase Firestore used to manage tasks, annotations, and user assignments.

---

## Features Pending

### Image Annotation Interface
- Allow users to upload an image for annotation.

### Task Navigation
- Display the list of completed tasks and their corresponding annotations.
- Include navigation between tasks (e.g., "Previous", "Next").

### Task Management
- Display a task list with filters (e.g., by status: Pending, In Progress, Completed).

### Input Validation
- Validate annotation inputs to prevent empty or invalid annotations.

### Performance Optimization
- Handle large images and tasks efficiently.

### Real-Time Updates
- Implement real-time updates using Firestore for tasks and annotations.

### UI Enhancements
- Add a progress bar to indicate the number of completed tasks.
- Support undo/redo for annotation actions.

### Testing
- Write unit tests for key components.
- Include integration tests for task management and annotation workflows.

---

## Tech Stack

### Frontend
- **Framework:** Next.js
- **Canvas:** HTML5 Canvas API for drawing annotations

### Backend
- **Database:** Firebase Firestore for task and annotation storage
- **Authentication:** Firebase Authentication (email/password)
- **Storage:** Firebase Storage for media handling

---

## Database Structure

### Users Collection:
```json
{
  "userId": "unique_identifier",
  "email": "user@example.com",
  "tasks": ["taskId1", "taskId2"]
}
```

### Tasks Collection:
```json
{
  "taskId": "unique_identifier",
  "imageURL": "link_to_image",
  "assignedTo": "userId",
  "annotations": [
    {
      "x": 10,
      "y": 20,
      "width": 100,
      "height": 50,
      "annotation": "Example Text"
    }
  ],
  "status": "Pending"
}
```

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SomaiaElbaradey/Image-Annotation-FE.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Add your Firebase configuration to `.env.local`:
   here's a temp example to use:
 ```bash
NEXT_PUBLIC_FIREBASE_API_KEY='AIzaSyA2E6evEJUCuR9Q4S8_ezF0fITEbIlgKpI'
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN='image-annotation-d0224.firebaseapp.com'
    NEXT_PUBLIC_FIREBASE_PROJECT_ID='image-annotation-d0224'
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET='image-annotation-d0224.firebasestorage.app'
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID='470621586335'
    NEXT_PUBLIC_FIREBASE_APP_ID='1:470621586335:web:b6862a4600e9df3aeaf3aa'

    AUTH_COOKIE_NAME='AuthToken'
    AUTH_COOKIE_SIGNATURE_KEY_CURRENT='secret1'
    AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS='secret2'

    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID='G-4'


    USE_SECURE_COOKIES=false
    FIREBASE_ADMIN_CLIENT_EMAIL='firebase-adminsdk-80y22@image-annotation-d0224.iam.gserviceaccount.com'
  ```
### To See sample of the work, Please Login using 
```bash
email: somayaelbarade@gmail.com
password: 123456
```

![image](https://github.com/user-attachments/assets/71e32d95-f17c-4b6a-b5f2-6c84ce3c8e7d)
![image](https://github.com/user-attachments/assets/c5cd9a46-d8b2-4261-b16c-0a12a727f7b2)



4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Access the app:**
   Visit `http://localhost:3000` in your browser.

---

## Assumptions
- Each task is assigned to a single user.
- Users can only see their assigned tasks.
- Firebase rules are configured to ensure secure access.


