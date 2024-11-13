# HealthTrackPro - A Holistic Health and Wellness Application

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Rajukrsna/HealthTrackPro1/blob/main/LICENSE)

## Table of Contents
- [Inspiration](#inspiration)
- [Project Objectives](#project-objectives)
- [Architecture Overview](#architecture-overview)
  - [High-Level Architecture Diagram](#high-level-architecture-diagram)
  - [Component Diagram](#component-diagram)
  - [Network Topology](#network-topology)
- [Technical Documentation](#technical-documentation)
  
  - [Explanation of Key Components and Modules](#explanation-of-key-components-and-modules)
  - [API Documentation](#api-documentation)
  - [Setup and Usage Instructions](#setup-and-usage-instructions)

---

## Inspiration
HealthTrackPro was inspired by the need for a comprehensive yet user-friendly application that empowers individuals to track their habits, understand their nutrition and their goal of calorie intake per day, get health symptom analysis from AI, receive personalized health advice for the same. Our goal is to help users make informed choices about their health through data-driven insights and AI-powered suggestions.

---

## Project Objectives
1. Develop a **holistic health and wellness application** focused on tracking user habits and analyzing nutrient intake.
2. Integrate **AI-based recommendations** for nutrition, wellness practices and to cure health symptom

---

## Architecture Overview

### High-Level Architecture Diagram
- **Frontend**: 
  - User Interface built with HTML, CSS, JavaScript, Bootstrap, and Chart.js to visualize health data.
- **Backend**: 
  - Node.js/Express server for handling requests, analyzing data, and connecting to external APIs.
- **Database**: 
  - MongoDB (NoSQL) hosted on AWS for secure and scalable data storage.
- **AI Model**: 
  - **Cohere AI model**: Used for health symptom analysis and personalized recommendations.
  - **AWS Bedrock**: for accessing the foundation models that AWS offers.
- **Lambda Functions**: 
  - AWS Lambda handles serverless execution of tasks like data processing and user request handling in the backend.

### Component Diagram
- **Frontend Components**:
  - Register, Login, Habit Tracking, Nutritional Analysis, Health Issue/symptom Input, HealthAI chatbot.
- **Backend Components**:
  - User Authentication, Data Processing, API Integration, and Database Communication, report generation.
- **Data Storage**:
  - MongoDB database hosted on AWS for secure and efficient management of user health data.

### Network Topology
- **User Device**:
  - Connects securely via HTTPS to the frontend, which communicates with the backend server.
- **Backend on AWS**:
  - Hosts the application server, managing all data requests from the AI Model and interactions through AWS Lambda functions.
- **Database**:
  - Deployed on AWS to ensure scalability, reliability, and security of user data.

---

## Technical Documentation

### Explanation of Key Components and Modules
- **User Authentication Module**: 
  - Manages user sessions and access control.
- **Habit Tracker Module**: 
  - Allows users to record and visualize daily activities.
- **Nutritional Analysis Module**: 
  - Accepts user food inputs and provides nutrient breakdown.
- **AI Recommendation Module**:
  - Uses **Cohere AI** for health symptom analysis and personalized recommendations based on user data.
  - **AWS Bedrock** enables advanced AI models for health trend analysis and predictions.


### Setup and Usage Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Rajukrsna/HealthTrackPro1.git
   
   cd HealthTrackPro1

2. **Install the necessary Dependencies and start running it at the localhost:3000**

