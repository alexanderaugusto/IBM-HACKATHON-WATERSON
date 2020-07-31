## Node.JS API

## First clone this repository: 
> git clone https://github.com/alexanderaugusto/IBM-HACKATHON-WATERSON.git

The backend API is running in a Cloud Foundry application on IBM Cloud: https://watersonbackend-chipper-genet-kv.mybluemix.net.

if you want to run locally, try the next steps:

### Instalations:
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
