# React Protected Routes And Components Supported With Laravel Authorization

Continuation of the https://github.com/ddancho/react-laravel-spa-auth

with one guiding thought, authorization sensitive informations are not stored at the front,

neither in the storage or state manager, it is always communicated with the backend

Please follow the instructions in the api and client subfolders to bootstrap the app...

## App

Three roles are available :

super admin, admin, user

Each role has certain privileges (accessibility) controlled by the level of authorization :

- after registration user is available for the assignment
- user can edit only his task
- super admin and admin can create new task for the users,
  and they can edit tasks from all users
- only super admin has access to admin page

By default one user with super administrator role is created :

Email : superadmin at example.com
Password : 123

And 10 users with 3 tasks :

Email : -- check in the db table users --
Password : password

App is on : http://localhost:3000/

PhPMyAdmin is on : http://localhost:8080/index.php
