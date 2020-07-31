# mobile

## This repository can also be found at this link https://github.com/alexanderaugusto/hackathon-ibm-mobile.git, we added it here to facilitate the submission of the project.

## First clone this repository: 
> git clone https://github.com/alexanderaugusto/IBM-HACKATHON-WATERSON.git

## Introduction
This application was developed using the Javascript language with the [React Native](https://reactnative.dev/) and [Expo-cli](https://docs.expo.io/)  library. It is where the client will use all the resources hidden behind the scenes of our application.

## Important
Sorry, but we still don't have the Andaroid version of it, so we just leave it in the APK folder inside the android folder.

But if you want to run our app on IOS, try to run the Expo app, just follow the steps below.

## Instalations: 
#### OBS: If you have nodejs and expo installed, jump for the next step.
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

- Install expo-cli:
	Just run this command for install expo-cli:
	> **`npm install expo-cli or yarn add expo-cli`**

- Install Expo App:
	- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
	- IOS: https://apps.apple.com/br/app/expo-client/id982107779
	
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
	

- Install expo-cli:
	Just run this command for install expo-cli:
	> **`npm install expo-cli or yarn add expo-cli`**

- Install Expo App:
	- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
	- IOS: https://apps.apple.com/br/app/expo-client/id982107779
	
##### Arch Linux:
- Install nodejs and yarn:

	> **`sudo pacman -S nodejs yarn`**
	
	or
	
	> **`sudo pacman -S nodejs npm`**
	
- Install expo-cli:
	Just run this command for install expo-cli:
	> **`npm install expo-cli or yarn add expo-cli`**

- Install Expo App:
	- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
	- IOS: https://apps.apple.com/br/app/expo-client/id982107779
	
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

- Install expo-cli:
	Just run this command for install expo-cli:
	> **`npm install expo-cli or yarn add expo-cli`**
	
- Install Expo App:
	- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
	- IOS: https://apps.apple.com/br/app/expo-client/id982107779
	
###  Run:
Finally, after all the instalations, let's run the project:

- First, install the dependences on project, by simply run:

    > **`yarn install or npm install or expo install`**

- Now, run the project:

    > **`yarn start or npm start or expo start`** 

- Go to expo app and see the project running, click on the app running.
