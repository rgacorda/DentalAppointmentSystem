# BPDCASS
This repository is for the BPDCASS web application development.

# 08/31/23
added sql docker:
    run "docker-compose up"
    create database named "bpdcass_development"

added routes
added misc

# 08/31/23
minor changes on index.js

# 09/01/23
added tables for models but not yet complete:
    appointment.js doesn't have foreign id yet

# 09/02/23
major changes on models: still not finished (foreign keys)

# 09/02/23
restructured the folders to adhere to the mvc architecture
# 09/02/23
added controllers folder
# 09/02/23
restructured and centralized all the routes into one file: requestRoutes.js
# 09/02/23
renamed the models using camelCase (e.g nameModel.js)
# 09/02/23
created a controller for the userModel
# 09/02/23
connected the requestRoutes to the userController
#01/10/2023
password needs to be hashed before saving to the db
