# IBM-HACKATHON-WATERSON

Project Waterson designed with IBM Cloud services for Call For Code Hackathon.

## git clone https://github.com/alexanderaugusto/IBM-HACKATHON-WATERSON.git

### Waterson Project Diagram

![waterson_diagram](https://user-images.githubusercontent.com/51683816/89073923-c2aab300-d351-11ea-82b4-bda11ef0ac8c.png)

- User accesses the application developed with React Native wherever he is;
- Application accesses the Node.Js api implemented on IBM Cloud Foundry;
- The Node.Js Api can communicate with Watson Asisstant to search for flood information;
- The Node.Js Api accesses and returns to the user current and future weather data from the Dark Sky API via an Action Cloud Function developed in Python;
- Node.Js Api accesses a Machine Learning model created at Watson Studio by AutoIA Experiment, which takes data from the INMET and CGESP portal and returns the chances of a given location having floods on a given day.
