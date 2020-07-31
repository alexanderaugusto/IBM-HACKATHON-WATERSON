# Node.JS API

## This repository can also be found at this link https://github.com/alexanderaugusto/hackathon-ibm-backend.git, we added it here to facilitate the submission of the project.

## First clone this repository: 
> git clone https://github.com/alexanderaugusto/IBM-HACKATHON-WATERSON.git

## Introduction
This api rest, developed with the JavaScript language and nodejs, aims to connect with all IBM services used in the project.

### IBM Cloud Foundry
This service was used to put this API into "production", so you don't have to run it locally to use the application. We connect to it following the IBM documentation to upload a server in nodejs, the configured data is in the .env file at the root of the project.

### IBM Cloud Action Function
This service was used to collect some data from the Dark [Sky API](https://darksky.net/dev). As the collection code was in Python, this service went very well, as we were able to easily upload the code to IBM Cloud and use it in nodejs as a Web Action.

### IBM Cloud Watson Assistent
This service was used to guide the user in cases of flooding. The Assistant manages to resolve several doubts, thus leaving people informed about flood cases throughout the world. Of course he is still a child, our team had never touched Watson Assistent before, so he was not perfect, but I confess that it was a beautiful learning experience.

The connection made to it was made by node js, using the ibm-watson library. The access credentials are found in the .env file at the root of the project.

### IBM Cloud Watson Machine Learning and Watson Studio
These services were used to train and use a Machine Learning model, created to show the user the risk of flooding in a given location. The model was created with IBM's AutoIA Experiment and we used Linear Regression.

It was not perfect, but the main factor was because the amount of data we collected was not enough, we intend to continue this project and further improve our model.

The data collected are in the São Paulo region, we have not yet been able to expand it throughout the world. Because the only APIs we were able to use were that of [INMET](http://www.inmet.gov.br/portal/) and [CGESP](https://www.cgesp.org/v3/).

The connection made to it was made by node js, through an api rest. We made the connection following the IBM documentation, all settings are at the root of the project in the .env file.

## Important 
Inside the test folder, there is a file called IBM-HACKATHON.postman_collection.json, where are the routes we used in the project with a [Postman](https://www.postman.com/) file. To run the routes, first configure the variable environment **hackathon-ibm-url** in Postman, in **Manage Environments>Global>current>API_URL**
	
The backend API is already running in a Cloud Foundry serviçi on IBM Cloud: https://watersonbackend-chipper-genet-kv.mybluemix.net.

But, if you want to run locally, try the next steps:

## Instalations:
#### OBS: With you have nodejs installed, jump for the next step for run the project.

#### 1) On windows:
On windows, let's install with chocolatey.

- Install chocolatey:
Fist, open the powershell with administrator (ctrl + X or click with the right button of mouse on the start button).

	 Run this command for check if you have permission for install dependences with the terminal.
	> **`Get-ExecutionPolicy`**

	If the return is diferent of **Restricted** jump for the next part. If not, run this command:
	> **`Set-ExecutionPolicy AllSigned`**

	Finally, install chocolatey with this line:
	> **`Set-ExecutionPolicy Bypass -Scope Process -			Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`**

	Now, test the installation by running on terminal (Nothing will be, but can't return any error):
	> **`choco`**

- Install nodejs and yarn:

	Just run this command for install nodejs:
	> **`choco install -y nodejs-lts yarn`**

	Restart you terminal and try to run (All the dependences have to return the version of the package):
	> **`node -v`**

	> **`npm -v`**
    
	> **`yarn -v`**

#### 2) On Linux:
##### - Ubuntu (Debian):
- Install Curl:

	Check if you had installed the curl:
	> **`sudo  apt-get  install  curl`**

- Install nodejs:
In this tutorial, the installation is with curl, if you want to install with a package manager, try this: [nvm](https://github.com/nvm-sh/nvm#about).

	Now, if the curl installed, run this command:

	***Using Ubuntu:***
	> **`curl -sL https://deb.nodesource.com/setup_12.x | 			sudo -E bash -
sudo apt-get install -y nodejs`**

	***Using Debian, with root:***
	>**`curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs`**

- Install yarn:

	Configure the yarn repository in your system:
	>**`curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`**

	Execute this command for install yarn:
	> **`sudo apt update && sudo apt install --no-install-recommends yarn`**

	Now, check the installations:
	> **`node -v`**
	> **`npm -v`**
	> **`yarn -v`**

##### Arch Linux:
- Install nodejs and yarn:

	> **`sudo pacman -S nodejs yarn`**
	
	or
	
	> **`sudo pacman -S nodejs npm`**

#### 3) On mac:
On mac, let's install with Homebrew.

- Install Homebrew

	Simply run this command for install homebrew:
	> **`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`**

- Install nodejs and yarn:

	With the homebew, let's install nodejs and yarn
	> **`brew install node`**

	> **`brew install yarn`**

- Check the installation by just running this commands:

	> **`node -v`**

	> **`npm -v`**

	> **`yarn -v`**

###  Run:
Finally, after all the instalations, let's run the project:

- First, install the dependences on project, by simply run:

    > **`yarn install or npm install`**

- Now, run the project:

    > **`yarn start or npm start`** 

- In development, run this command. Because, the project will use nodemon for hear the changes and render modifications on save.
    > **`yarn dev or npm dev`** 

- Go to [http://localhost:3333](http://localhost:3333) for see the project running.
