# Laravel api

The api backend was bootstrapped as docker containers : curl -s https://laravel.build/api | bash

Meilisearch and selenium are disabled.

Redis added as session driver.

cd into project folder and exec ./vendor/bin/sail up

migrate ./vendor/bin/sail artisan migrate

seed database ./vendor/bin/sail artisan db:seed

phpmyadmin is on localhost:8080
