pipeline {
    agent any

    tools {
        nodejs 'NodeJS_17' // Ensure this matches the NodeJS installation name you set in Jenkins
    environment {
        DOCKER_IMAGE = 'note-app:latest' // Example image name
        GIT_URL = 'https://github.com/BinilTomJose1278/NotesApp.git' // Your repository URL
    }

    stages {
        stage('Install Dependencies') {
        stage('Build') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
                echo 'Building the project...'
                // For Windows, use 'bat' instead of 'sh'
                bat 'echo Building the project on Windows'
                // Example for npm build or Docker build if you're using Node.js or Docker:
                // bat 'npm install'
                // bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Build Docker Image') {
        stage('Test') {
            steps {
                // Build Docker image
                echo 'Building Docker image...'
                sh 'docker build -t notesapp .'
                echo 'Running tests...'
                // Use 'bat' to run tests on Windows
                bat 'echo Running tests on Windows'
                // Example for Node.js testing:
                // bat 'npm test'
            }
        }
 stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                // Example SonarQube analysis for Windows:
                bat 'echo Running SonarQube analysis'
                // If using SonarQube or another tool, integrate here
            }
        }

        stage('Test') {
        stage('Deploy') {
            steps {
                // Run tests
                echo 'Running tests...'
                sh 'npm test'
                echo 'Deploying the application...'
                // For Docker Compose or any other Windows-friendly deployment tool
                bat 'echo Deploying the application on Windows'
                // Example for Docker Compose:
                // bat 'docker-compose up -d'
            }
        }

        stage('Deploy to Staging') {
        stage('Release') {
            steps {
                // Deploy to a staging environment
                echo 'Deploying to staging...'
                sh 'docker run -d -p 8080:80 --name notesapp-staging notesapp'
                echo 'Releasing the application...'
                bat 'echo Releasing the application to production'
                // Integrate release management commands (e.g., AWS CodeDeploy, Octopus)
            }
        }
    }
        stage('Monitoring & Alerting') {
            steps {
                echo 'Setting up Monitoring and Alerting...'
                bat 'echo Monitoring production environment on Windows'
                // Integrate monitoring tools like Datadog or New Relic here
            }
        }
  }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
            echo 'Pipeline failed!'
        }
    }
}
