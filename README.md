# 🎉 Event Management System SPA

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

**✨ A complete project for user and event management with authentication, roles, and CRUD using JavaScript, HTML, CSS, and json-server. ✨**

</div>

---

## 📖 Table of Contents

- [🎯 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [🎮 Usage](#-usage)
- [🦻 Customization](#-Customization) 
- [🖥️ File Overview](#-File-Overview) 
- [🏗️ Project Structure](#️-project-structure)
- [👥 Author](#-author)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🎯 About the Project

(Single Page Application) to manage users and events, with authentication, roles (admin/user), route protection and full CRUD, connected to a mock backend using **JSON-SERVER** This technical test was made with a lot of effort and dedication for Riwi  


## ✨ Features

| Feature                    | Description                                                          | Status   |
| -------------------------- | -------------------------------------------------------------------- | -------- |
| 🔐 **Login & Roles**       | Authentication and access control based on user role                 | ✅ Ready |
| 👤 **User CRUD**           | Create, edit, delete, and list users (admin only)                    | ✅ Ready |
| 📦 **Event CRUD**          | Create, edit, delete, and list products (admin only for create/edit) | ✅ Ready |
| 👁️ **Event View**          | All users can view products                                          | ✅ Ready |
| 🛡️ **Route Protection**    | Restricted access to pages based on role                             | ✅ Ready |
| 🧭 **Dynamic Navigation**  | Menu changes based on role and session state                         | ✅ Ready |
| 💾 **Local Persistence**   | Session and data management in localStorage                          | ✅ Ready |
| ⚡ **Responsive & Modern**  | Visually attractive and adaptable UI                                 | ✅ Ready |

---
## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 🟢
- [json-server](https://github.com/typicode/json-server) 🗄️

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/crismiau/JavascriptExam.git
   cd JavascriptExam
   ```

2. **Install JSON Server globally (if not already installed):**
   ```bash
   npm install -g json-server
   ```

3. **Start the JSON Server:**
   ```bash
   json-server --watch db.json --port 3000
   ```

4. **Open `index.html` in your browser.**
   - You can use the Live Server extension in VS Code or open the file directly.

---

## 🧑‍💻 Usage

- **Login:** Use one of the users from `db.json` to log in.
- **Admin Role:** If you log in as an admin, you can manage users and events.
- **Regular User:** If you log in as a regular user, you can view and enroll in events.
- **Logout:** Use the logout button in the navigation bar.

---

## 🛠️ Customization

- To add more users, events, or enrollments, edit the `db.json` file.
- To change styles, edit `styles/styles.css`.
- All UI text and code comments are in English for clarity and maintainability.

---

## 📄 File Overview

- **crud.js:** Handles all API requests (CRUD) for users, events, and enrollments.
- **formHandlers.js:** Contains logic for handling forms, user actions, and UI updates.
- **navigation.js:** Manages SPA route changes and view loading.
- **spa.js:** Initializes the SPA, sets up global event listeners, and handles route changes.
- **events.html, users.html, login.html, newuser.html:** HTML templates for each SPA view.
- **styles.css:** Main stylesheet for the application.

---

## 🏗️ Project Structure

```
/JavascriptExam
│
├── db.json                # JSON server database (users, events, enrollments)
├── index.html             # Main HTML entry point
├── /pages                 # HTML pages for SPA views
│   ├── events.html
│   ├── login.html
│   ├── newuser.html
│   └── users.html
├── /js                    # JavaScript source files
│   ├── crud.js            # CRUD operations for users, events, enrollments
│   ├── formHandlers.js    # Form logic and UI handlers
│   ├── navigation.js      # SPA navigation logic
│   └── spa.js             # SPA initialization and global listeners
├── /styles
│   └── styles.css         # Main stylesheet
└── /src
    └── guatape.png        # Example event image
```

---

## 👥 Author

**Cristian Agudelo** - _Lead Developer_ - [My Github](https://github.com/crismiau)

---

## 🙏 Acknowledgments

- **Riwi**: For the challenge and inspiration to do this technical exam.
- **json-server**: For making frontend development easier by simulating a real backend.
- **Vite** To watch my project in the localsever
---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

**Made with ❤️ and lots of ☕**

</div>















