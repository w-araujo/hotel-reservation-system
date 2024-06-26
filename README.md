# Hotel Reservation System

Creation of an API that manages guests and their reservations for a specific hotel

## Table of Contents

- [Overview](#-overview)
- [Technologies Used](#️-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [Features](#-features)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Overview

This API is automated with Docker, running its migrations, creating typings, and running the API together with the SQL Server database. It has Swagger available for making requests and includes user permission control.

![er](https://github.com/w-araujo/hotel-reservation-system/blob/develop/er-database.png)

![swagger](https://github.com/w-araujo/hotel-reservation-system/blob/develop/swagger.png)

## 🛠️ Technologies Used

- [NodeJS](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQLSERVER](https://www.microsoft.com/pt-br/sql-server/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Zod](https://zod.dev/)
- [bcrypt](https://www.npmjs.com/package/bcryptjs)

## 📦 Installation

Make sure you have node installed on your computer:
https://nodejs.org/pt

Make sure you have dokcer installed on your computer:
https://www.docker.com/

## 🚀 Usage

  <ul>
       <li>
        Open the terminal or command prompt.
        </li>
        <li> 
        To clone the project via HTTPS, run this command:
        <p>
        <code>git clone https://github.com/w-araujo/hotel-reservation-system.git</code>
        </p>
        </li>
        <li>
        Make a copy of the <code>.env.example</code> file and rename this copy to <code>.env</code>, then fill in the remaining data. 
        </li>
        <li> 
       Now open the terminal at the root of the project and run the command <code>sudo docker compose up</code> to execute Docker Compose.
        </li>
        <li>
         Wait 30 seconds for the migrations to run automatically (if they don’t run, change the time <code>sleep</code> in the root project file <code>entrypoint-dev.sh</code> to a longer time)
        </li>
        <li>
          After completing all the steps above, run the seeds to populate the database with this command: <code>npm run prisma:seed</code> in the root project.
        </li>
        <li>
        If you don’t want to run the seeds, create a guest (Swagger) and change their role to "ADMIN" directly in the database.
        </li>
        <li>
        Use Swagger at this URL: <a href=http://localhost:3333/docs> Swagger</a>
        </li>
 </ul>

## 🚀 Features

### Public Endpoints

<ol>
 <li> 
 Register guests (Creating a generic address) | route -> (POST) guest/create
</li>
 <li> 
 Login to the system | route -> (POST) session/login
 </li>
</ol>

### Administrator Permission (ADMIN)

<ol>
 <li> 
 Can log in to the system | route -> (POST) session/login
 </li>
 <li> 
 Can register new addresses (not necessary) | route -> (POST) address/create
 </li>
 <li> 
 Can edit guests’ addresses or their own | route -> (PATCH) address/update/{id}
 </li>
 <li> 
  Can edit guests’ data or their own | route -> (PATCH) guest/update/{id}
 </li>
 <li> 
 Can update reservation to “CHECK IN” | route -> (PATCH) reservation/update/changeStatusCheckin/{id}
 </li>
 <li> 
 Can update reservation to “CHECK OUT” | route -> (PATCH) reservation/update/changeStatusCheckout/{id}
 </li>
 <li> 
 Can list reservations within a period | route -> (GET) reservation/getReservationsByPeriod
  </li>
 </ol>

### Guest Permission (GUEST)

<ol>
 <li> 
 Can log in to the system | route -> (POST) session/login
 </li>
 <li> 
 Can edit their guest data | route -> (PATCH) guest/selfUpdate
 </li>
 <li> 
 Can edit their address | route -> (PATCH) address/selfUpdate
 </li>
 <li> 
 Can list their own reservations | route -> (GET) profile/selfReservations
 </li>
 <li> 
 Can create their reservation | route -> (POST) reservation/create
 </li>
  <li> 
Can cancel their reservation | route -> (PATCH) reservation/update/changeStatusCanceled/{id}
 </li>
</ol>

## 📝 License

This project is under the MIT license. See the file LICENCE for more details.

## 📧 Contact

<div style="display: flex">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wesley-araujo-a99198201/)

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/w-araujo)

</div>
