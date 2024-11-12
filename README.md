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
  - [System Architecture and Design](#system-architecture-and-design)
  - [Explanation of Key Components and Modules](#explanation-of-key-components-and-modules)
  - [API Documentation](#api-documentation)
  - [Setup and Usage Instructions](#setup-and-usage-instructions)
- [Future Plans](#future-plans)
- [Challenges](#challenges)
- [What's Next](#whats-next)

---

## Inspiration
HealthTrackPro was inspired by the need for a comprehensive yet user-friendly application that empowers individuals to track their habits, understand their nutrition, and receive personalized health advice. Our goal is to help users make informed choices about their health through data-driven insights and AI-powered suggestions.

---

## Project Objectives
1. Develop a **holistic health and wellness application** focused on tracking user habits and analyzing nutrient intake.
2. Integrate **AI-based recommendations** for nutrition and wellness practices in future phases.

---

## Architecture Overview

### High-Level Architecture Diagram
- **Frontend**: 
  - User Interface built with HTML, CSS, JavaScript, Bootstrap, and Chart.js to visualize health data.
- **Backend**: 
  - Node.js/Express server for handling requests, analyzing data, and connecting to external APIs.
- **Database**: 
  - MongoDB (NoSQL) to store user data securely.
- **AI Model (Future)**: 
  - AI service layer for personalized recommendations and analysis of health trends.

### Component Diagram
- **Frontend Components**:
  - Login, Habit Tracking, Nutritional Analysis, Health Issue Input.
- **Backend Components**:
  - User Authentication, Data Processing, API Integration, and Database Communication.
- **Data Storage**:
  - Cloud-hosted MongoDB database on Vultr to store and manage user data.

### Network Topology
- **User Device**:
  - Connects securely via HTTPS to the frontend, which communicates with the backend server.
- **Backend on Vultr**:
  - Hosts the application server, managing all data requests and interactions.
- **Database**:
  - Deployed on Vultr’s private network for secure and optimized data handling.

---

## Technical Documentation

### System Architecture and Design
- **Frontend**: 
  - Developed with HTML, CSS, JavaScript, Bootstrap, and Chart.js for dynamic data visualization.
- **Backend**: 
  - Node.js and Express.js, handling API calls, data processing, and communication with MongoDB.
- **Database**:
  - MongoDB for secure data storage and management of user health information.

### Explanation of Key Components and Modules
- **User Authentication Module**: 
  - Manages user sessions and access control.
- **Habit Tracker Module**: 
  - Allows users to record and visualize daily activities.
- **Nutritional Analysis Module**: 
  - Accepts user food inputs and provides nutrient breakdown.
- **AI Recommendation Module (Future)**: 
  - Plans to use machine learning to deliver personalized health advice based on user trends.

### API Documentation
- **GET /healthData**: 
  - Retrieves user’s health data from the database.
- **POST /nutrition/analyze**: 
  - Analyzes nutrient content from user-provided food input data.
- **POST /habit/update**: 
  - Updates daily habit tracking data in the database.

### Setup and Usage Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Rajukrsna/HealthTrackPro1.git
   cd HealthTrackPro1
2.run the command: npm install
3. run it at localhost:3000
