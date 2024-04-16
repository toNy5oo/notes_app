## Notes App (Frontend)

# Notes App

This is a dynamic web application built using Vite and React that allows users to take, organize, and manage notes efficiently. Users can choose colors for individual notes, pin and unpin notes, and view them in either a grid or list layout. The backend API is developed with Java Spring Boot, supporting RESTful interactions for managing the notes.

## Features

- **Create Notes**: Users can add notes with a title and a description. Each note can be color-coded.
- **Pin/Unpin Notes**: Important notes can be pinned to the top of the page for easy access.
- **Delete Notes**: Users can delete notes they no longer need.
- **Change Note Color**: The color of a note can be changed after its creation.
- **Flexible Viewing Options**: Notes can be viewed in a grid or a list format.

*Upcoming Features:*
- **Edit Notes**: Users will be able to edit the content of the notes (title and description).

## Technology Stack

- **Frontend**: Vite, React, SWR
- **Backend**: Java Spring Boot
- **API Type**: RESTful

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- Java JDK 11 or newer
- Maven


#### [Backend](https://github.com/toNy5oo/note_app_backend)
The backend is pre-deployed in a Docker container on Render, so there is no need to set up the backend locally for typical usage. If you need to run the backend locally for development or testing:

1. Ensure Docker is installed on your machine. If not, download and install Docker from [docker.com](https://www.docker.com/).

2. You can pull the Docker image of the application from Render or use the provided `Dockerfile` to build the image locally:
   ```sh
   docker build -t your-backend-image-name .
