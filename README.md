<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>NOVELIO</h1>
<p align="left">
	<img src="https://img.shields.io/github/license/JeffHenry/Novelio?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/JeffHenry/Novelio?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/JeffHenry/Novelio?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/JeffHenry/Novelio?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

## Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Roadmap](#-project-roadmap)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

## Overview

<p>
<strong>Novelio</strong> is a React-based web application for managing a book collection with user reviews based on inspiration from sites like GoodReads. It integrates with Firebase Realtime Database for backend data storage and Firebase Auth for authentication, supporting user roles with admin privileges.<br><br>

<strong>Technology Stack</strong><br>

- React with TypeScript for frontend UI<br>
- React Router for client-side routing<br>
- Firebase Authentication and Realtime Database for user and data management<br>
- Google Books API integration for automatic book data lookup<br>
- Tailwind CSS for styling

## Features

<p>
- <strong>User Authentication:</strong> Login, signup, and role-based access control with an <code>isAdmin</code> flag.<br>
- <strong>Book Management:</strong><br>  
  &nbsp;&nbsp;- View detailed book information, including author, description, publication year, cover image, and user reviews.<br>  
  &nbsp;&nbsp;- Admin users can add new books via a form with ISBN lookup from the Google Books API to auto-fill book details.<br>  
  &nbsp;&nbsp;- Admin users can delete books from the collection.<br>
- <strong>Review Management:</strong><br>  
  &nbsp;&nbsp;- Users can add reviews with ratings.<br>  
  &nbsp;&nbsp;- Admin users can delete individual reviews.<br>
- <strong>Pagination:</strong> Reviews are paginated for better readability.<br>
- <strong>Protected Routes:</strong> Certain pages and actions are restricted to admin users only.<br><br>
</p>

---

## Project Structure

```sh
└── Novelio/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.tsx
    │   ├── assets
    │   │   └── hero-image.png
    │   ├── components
    │   │   ├── BookCard.tsx
    │   │   ├── ProtectedAdminRoute.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   ├── PublicRoute.tsx
    │   │   ├── RatingStars.tsx
    │   │   ├── ReviewForm.tsx
    │   │   ├── ReviewList.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── TopNav.tsx
    │   │   └── ui
    │   ├── context
    │   │   └── AuthContext.tsx
    │   ├── firebase
    │   │   ├── auth.ts
    │   │   ├── books.ts
    │   │   └── firebase.ts
    │   ├── hooks
    │   │   └── useAuthHandlers.ts
    │   ├── index.css
    │   ├── lib
    │   │   ├── authHelpers.ts
    │   │   ├── googleBooks.ts
    │   │   └── utils.ts
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── AddBookPage.tsx
    │   │   ├── AddRatingPage.tsx
    │   │   ├── BookDetailPage.tsx
    │   │   ├── BookListPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── SignupPage.tsx
    │   │   └── UnAuthorizedPage.tsx
    │   ├── types
    │   │   └── books.ts
    │   └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

---

## Project Roadmap

- [x] **`Task 1`**: <strike>MVP with ability to sign up, rate books, and search.</strike>
- [ ] **`Task 2`**: Implement collections such as Want To Read, Read, and In Progress.
- [ ] **`Task 3`**: Implement collections by genre (Best Books of 2024, etc).
- [ ] **`Task 4`**: Implement backend to generate book lists using Google Books API.

---

## License

This project is protected under the [MIT License](https://choosealicense.com/licenses/mit/).

---

## Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
