# IBM-HACKATHON-WATERSON

Project Waterson designed with IBM Cloud services for Call For Code Hackathon.

## First clone this repository: 
> git clone https://github.com/alexanderaugusto/IBM-HACKATHON-WATERSON.git

### Waterson Project Diagram

![waterson_diagram](https://user-images.githubusercontent.com/51683816/89089585-6dcc6400-d374-11ea-8b70-9f586d8ba99e.png)

- User accesses the application developed with React Native wherever he is;
- Application accesses the Node.Js api implemented on IBM Cloud Foundry;
- The Node.Js Api can communicate with Watson Asisstant to search for flood information;
- The Node.Js Api accesses and returns to the user current and future weather data from the Dark Sky API via an Action Cloud Function developed in Python;
- Node.Js Api accesses a Machine Learning model created at Watson Studio by AutoIA Experiment, which takes data from the INMET and CGESP portal and returns the chances of a given location having floods on a given day.
