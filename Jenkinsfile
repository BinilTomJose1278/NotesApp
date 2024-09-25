pipeline {
    agent {
        docker {
            image 'docker:latest' // Docker image with Docker pre-installed
            args '-u root --privileged' // Allows Docker-in-Docker (DIND)
        }
    agent any
    tools {
        nodejs 'NodeJS_16' // Ensure this matches the configured Node.js version
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Deploy') {
            steps {
                // Build and run the Docker container
                sh 'docker build -t notesapp .'
                sh 'docker run -d -p 8080:80 notesapp'
            }
