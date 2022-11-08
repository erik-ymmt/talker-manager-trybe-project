## Talker Manager Project

## About
&nbsp;&nbsp; This project developed a RESTful CRUD API. The API manages talkers registrations for an event. The database was created with MySQL. The concept of the project was made by [Trybe](https://www.betrybe.com/).
	
## Files:
&nbsp;&nbsp; Files developed by me:
- everything on the /src folder.
- Trybe's teams previously developed some files such as migration.sql and seed.sql.

## Technologies:
Technologies applied by me on this project:
- NodeJS;
- Express;
- MySQL;
- Docker;

## How to run the project (with docker):
- Make sure you have docker installed with versions 1.29 or higher;
- Git clone the repository;
- Run the database and the node containers with `docker-compose up -d`;
- Access the node container `docker exec -it talker_manager bash`; 
- Install all dependencies inside the container with `npm install`;
- You are ready to run the application! `npm start`; 


