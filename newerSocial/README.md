# newerSocial

A modern social media/blogging application built with React, Appwrite, and Tailwind CSS. This platform allows users to create accounts, publish posts with a rich text editor, and interact with content.

## 🚀 Features

-   **Authentication**: Secure user login and signup using Appwrite Auth.
-   **Create & Manage Posts**: Users can create, edit, and delete their own posts.
-   **Rich Text Editor**: Integrated TinyMCE for rich content creation (formatting, images, etc.).
-   **Image Uploads**: Support for uploading featured images for posts.
-   **Responsive Design**: Fully responsive UI built with Tailwind CSS.
-   **State Management**: efficient state management using Redux Toolkit.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://react.dev/) (Vite)
-   **Backend / BaaS**: [Appwrite](https://appwrite.io/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/)
-   **Editor**: [TinyMCE](https://www.tiny.cloud/)

## ⚙️ Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/newerSocial.git
    cd newerSocial
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Configuration**

    Create a `.env` file in the root directory and add your Appwrite configuration. You can use `.env.sample` as a reference.

    ```env
    VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
    VITE_APPWRITE_PROJECT_ID="your_project_id"
    VITE_APPWRITE_DATABASE_ID="your_database_id"
    VITE_APPWRITE_COLLECTION_ID="your_collection_id"
    VITE_APPWRITE_BUCKET_ID="your_bucket_id"
    ```

4.  **Run the application**

    ```bash
    npm run dev
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
