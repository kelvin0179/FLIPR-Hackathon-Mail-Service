# Flipr-Hackathon9.0 / Mailing Service

A Web-app to schedule and send Recurring, Montly, Weekly, Monthly, Yearly mails. 

Live Deployed [here](). // link dalna hai


## Built With
* [NodeJS](https://nodejs.org/en/docs/) -  evented I/O for the backend
* [Express](https://expressjs.com/) - framework for backend
* [Mongoose](https://mongoosejs.com/) - ODM
* [MongoDB](https://www.mongodb.com/) - Database
* [Express Handlebars](https://www.npmjs.com/package/express-handlebars) - Html templating
* [Node Cron](https://www.npmjs.com/package/node-cron) - Job scheduler

## Getting Started
These instructions will get your copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
you need to have NodeJs/npm installed on your machine
### Installation

```
Install dependencies 
```sh
$ npm install
```
Set up environment variables 

 // ye tm dekh lena #KELVIN

### Local Run
After setting up environment proceed with local run 
```sh
$ npm start
```

## File System
```sh
.
├── config 
│             ├── auth.js
│             ├── config.env
│             ├── db.js
│             └── passport.js
├── controllers  =
│             └── notifier.js
├── helpers
│             └── hbs.js
├── index.js
├── models                        
│             ├── gUser.js
│             ├── MailDB.js
│             └── User.js
├── package.json
├── package-lock.json
├── public
│             └── css
│                 ├── main.css
│                 └── style.css
├── README.md
├── routes                        
│             ├── auth.js
│             ├── history.js
│             ├── index.js
│             ├── notify.js
│             └── users.js
└── views                         
    ├── create.hbs
    ├── dashboard.hbs
    ├── edit.hbs
    ├── error
    │             ├── 400.hbs
    │             ├── 404.hbs
    │             └── 500.hbs
    ├── history.hbs
    ├── layouts
    │             ├── login.hbs
    │             └── main.hbs
    ├── login.hbs
    ├── partials
    │             ├── _add_btn.hbs
    │             ├── _flash.hbs
    │             └── _header.hbs
    ├── register.hbs
    └── show.hbs

```


## Deployment


### Heroku Deployment
```sh
$ heroku login -i
$ heroku git:remote -a <your-app-name>
$ git push heroku master
```
Set up environment variables 
```sh
$ heroku config:set ENV_VAR=<value>
```

### Google EC2 Deployment

### Instance Creation

* Create an EC-2 Instance in AWS using Ubuntu 18.04.
* Add Ports of Type SSH , http and https.
* Also Add Custom Ports of the Backend Localhost (Mine is 8080).

### Start the Google SSH Terminal

### Clone Your NodeJS Project

```bash
git clone <link>.git
cd <Cloned FolderName>
```

* After this you have to install all the Dependencies From your package.json file and mongoDB.
* To do that type

```bash
#install node 12.xx
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get update
```

### Set Up PM2 Process Manager

```bash
sudo npm i pm2 -g
pm2 start <FileName>.js (usually server.js)

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu
```

* The server should be up and running to try to access it through your IP and Port.

### Setup UFU Firewall

```bash
sudo ufw enable
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
sudo ufw status
```

### Install NGINX and Configure

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```
* Now delete all the text and type the following.
* Be sure to edit the custom ports and endpoints.
```bash
server {
        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name your_domain www.your_domain; # if you dont have a domain name then edit this line as (server_name _;)

        #For root directory and My Custom port is 8080 here
        location / {
        proxy_pass http://localhost:8081; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        }
}
```

* Press `ctrl + x` and then `y` and then press `enter`.

```bash
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo service nginx restart
```

* Everytime you edit your NGINX file you need to restart it.

### Your http deployment should be ready.

### For https you have to have a Domain name

### [Name.com](https://www.name.com/partner/github-students)

* If you have a student Github account then getting a free domain should be easy.
* After obtaining the domain , go to its DNS setting and Create two `A Records`.
* In the both records set the IP to your Elastic IP and set you domain name as following.
* In the first record `<SubDomain>.<Your_Domain_Name>`.
* In the second record `*.<SubDomain>.<Your_Domain_Name>`.

### Example

* My Domain name is `mohitjaiswal.studio`.
* My SubDomain is `mailhub`.
* So the name of two `A` records are `mailhub.mohitjaiswal.studio` and `*.mailhub.mohitjaiswal.studio`.

## Edit Server Name in NGINX

* Now that the Domain Name is Created we just have to edit the server name at
```bash
sudo nano /etc/nginx/sites-available/default
```
* Edit the Line
```bash
server name your_domain www.your_domain;
```
* Press `ctrl + x` and then `y` and then press `enter`.
* Restart NGINX with
```bash
sudo nginx -t
sudo service nginx restart
```

## Add SSL with LetsEncrypt

```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d yourdomain -d www.yourdomain

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

# Congratulations On Your https Deployment !


## Screen Shots

## Authors
* **Mohit Jaiswal** - *Initial work* - [kelvin0179](https://github.com/kelvin0179)
* **Harsh Vardhan** - *Initial work* - [desert3agle](https://github.com/desert3agle)
