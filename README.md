# AWS Rekognition and DynamoDB for Office Security System

## 1 Introduction
This project is an Office Security System to automatically predict whether a person is an employee or not using 
AWS Rekognition. There is an employee database (on AWS DynamoDB) to which you can upload the employee's image. 
When a person tries to enter the office, the
person uploads their image in the React JS front-end web application, which pushes
the image into a visitor S3 bucket. Upon upload, AWS Rekognition does a facial
recognition to check if the person is an employee (if they are present in DynamoDB
database) or not - and gives the response.

## 2 Process
When you want to add a person into the employee database, you upload their image into the employee S3 bucket.
This triggers the employee lambda which stores the person's raw data in the AWS DynamoDB database.
Whenever a person tries to enter the office, they add their image into the React JS front-end website,
which pushes the image into a visitor S3 bucket. Uploading of an image into the S3 bucket triggers
the visitor lambda function which calls AWS Rekogniton to check if the person is located in the AWS DynamoDB database.
Then it will send the information about the person through AWS SNS (Simple Notification Service). If a person is not found,
it will communicate the same again through AWS SNS.

## 3 Front-end Website
The entire front-end website is present in this repository. This front-end website is present for the visitors to upload their pictures. On uploading, AWS Rekognition decides whether they are
employees or not based on the employee information in the DynamoDB database. The employee is then updated using the AWS SNS (Simple Notification Service) if they are an employee
or not. You can find the entire code in the below link:
```
https://github.com/ypindi/AWS_Rekognition_Office_Security_System/tree/main/Website
```

## 4 Code
The Code for implementation of the project is located here:
1. Employee Lambda function for adding Employee into the AWS DynamoDB database
2. Visitor Lambda function for using AWS Rekognition to check if the person is an employee or not
3. YAML code for deploying the S3 buckets through Cloud formation. One S3 bucket is for adding employee pictures and the other S3 bucket is for adding the visitor pictures.

The above code is located here: 
[Code](https://github.com/ypindi/AWS_Rekognition_Office_Security_System/tree/main/Code)
```
https://github.com/ypindi/AWS_Rekognition_Office_Security_System/tree/main/Code
```
