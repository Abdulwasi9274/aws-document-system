# AWS Document Upload & Monitoring System

A Node.js backend application for uploading, managing, and monitoring user documents using **AWS S3, MySQL, SNS, and CloudWatch**.

The system is designed as a practice project for understanding how a Node.js application integrates with AWS cloud services for file storage, notifications, and monitoring.

## 🚀 Features

* User registration and login
* JWT-based authentication
* Document upload
* Support for:

  * PDF
  * JPG
  * JPEG
  * PNG
* Maximum file size: **10 MB**
* Store documents in **Amazon S3**
* Store document metadata in **MySQL**
* User-specific S3 document folders
* List user documents
* Download documents
* Delete documents
* SNS notification after document upload
* CloudWatch monitoring and logging
* Structured application logs
* REST API architecture

## 🏗️ Architecture

```text
                Internet / Client
                       |
                       v
                Node.js Application
                       |
          +------------+------------+
          |                         |
          v                         v
       MySQL                    AWS S3
   Metadata Storage          Document Storage
          |                         |
          |                         v
          |                       SNS
          |                         |
          |                         v
          |                    Email Notification
          |
          +------------+
                       |
                       v
                  CloudWatch
              Logs / Metrics / Alarms
```

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* Multer
* MySQL

### AWS Services

* Amazon S3
* Amazon SNS
* Amazon CloudWatch
* AWS IAM

### Development Tools

* Git
* GitHub
* Postman
* VS Code

## 📁 Project Structure

```text
document-system/
│
├── config/
│   └── db.js
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── ...
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> Folder names may change as the project is developed further.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Abdulwasi9274/aws-document-system.git
```

### 2. Go to the project folder

```bash
cd aws-document-system
```

### 3. Install dependencies

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=document_system
DB_PORT=3306

AWS_REGION=ap-south-1
AWS_S3_BUCKET=firstwasi
```

If AWS access keys are required for local development, configure them securely using AWS CLI/IAM credentials rather than committing secrets to GitHub.

### ⚠️ Important

Never upload `.env` to GitHub.

The project `.gitignore` contains:

```gitignore
node_modules/
.env
uploads/
*.log
```

## 🗄️ Database

The application uses **MySQL** for storing document metadata.

Example document information:

```text
id
user_id
original_name
s3_key
s3_url
file_size
mime_type
uploaded_at
```

The actual document file is stored in Amazon S3, while MySQL stores information about that document.

## ☁️ Amazon S3

Amazon S3 is used for storing uploaded documents.

Example S3 object structure:

```text
users/
├── 101/
│   └── documents/
│       ├── resume.pdf
│       └── photo.jpg
│
└── 102/
    └── documents/
        └── certificate.pdf
```

The S3 bucket should remain private when storing user documents.

## 📤 Document Upload

Supported file types:

```text
PDF
JPG
JPEG
PNG
```

Maximum file size:

```text
10 MB
```

Example API:

```http
POST /api/documents/upload
```

Multipart form-data:

```text
userId
document
```

## 🔔 Amazon SNS

Amazon SNS can be used to send notifications after a successful document upload.

Example flow:

```text
Document Upload
       ↓
      S3
       ↓
      SNS
       ↓
Email Notification
```

## 📊 CloudWatch

Amazon CloudWatch is used for application monitoring.

The project can be extended to monitor:

* Application logs
* API errors
* Request activity
* EC2 metrics
* CPU utilization
* Memory-related monitoring
* Application health
* CloudWatch alarms

Example monitoring flow:

```text
Node.js Application
        ↓
CloudWatch Logs
        ↓
CloudWatch Metrics
        ↓
CloudWatch Alarm
        ↓
SNS Notification
```

## 🔑 IAM

AWS IAM is used to control permissions between the application and AWS services.

For production deployments, IAM Roles should be preferred over storing long-term AWS access keys directly in application code.

Example permissions may include access to:

```text
S3
SNS
CloudWatch
```

Only the permissions required by the application should be granted.

## ▶️ Run the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The application runs on:

```text
http://localhost:5000
```

## 🧪 API Testing

The APIs can be tested using **Postman**.

Example endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login

POST   /api/documents/upload
GET    /api/documents
GET    /api/documents/:id
DELETE /api/documents/:id
```

> Available endpoints may change as development continues.

## 🔒 Security

The project follows basic security practices:

* JWT authentication
* Private S3 bucket
* IAM-based AWS permissions
* File type validation
* File size validation
* Environment variables for configuration
* `.env` excluded from Git
* User-specific document access

## 🎯 Learning Objectives

This project is designed to provide practical experience with:

* Node.js backend development
* REST APIs
* JWT authentication
* File uploads
* Amazon S3
* Amazon SNS
* Amazon CloudWatch
* AWS IAM
* MySQL
* Git and GitHub
* Cloud-based application architecture

## 🔮 Future Improvements

Possible future enhancements:

* React frontend
* HTTPS with Application Load Balancer
* EC2 deployment
* Auto Scaling Group
* Route 53 domain
* CloudWatch dashboards
* CloudWatch alarms
* S3 lifecycle policies
* Presigned URLs
* Docker deployment
* CI/CD pipeline
* Load testing
* High-availability deployment

## 👨‍💻 Author

**Abdul Wasim**

B.Tech — Electronics & Communication Engineering

GitHub:

https://github.com/Abdulwasi9274

## 📄 License

This project is created for learning, practice, and educational purposes.
