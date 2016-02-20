
# 2.19.2016

* Added post composition route /new
* Added post view route /{post-id}
* Added post creation mutation
* Improved handling of dev/production db (prod needs ssl, for example)
* Split webpack build config into dev/prod
* The backend now serves compressed static js, not webpack-dev-server


# 2.5.2016

* Created git repo
* Created basic graphql schema
* Created basic sequelize model schema
* Created local (mac postgres app) and remote (heroku postgres) databases
* Deployed initial version of app to `https://genial.herokuapp.com` and https://genial.herokuapp.com/graphql
* Basic query docs