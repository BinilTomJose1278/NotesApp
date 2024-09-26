pipeline {
    agent {
        docker {
            image 'node:14-alpine' // Use an official Node.js image
            args '-p 3000:3000' // Map port 3000 for your app
        }
    }
    environment {
        HOME = '.'
        GIT_URL = 'https://github.com/BinilTomJose1278/NotesApp.git'
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                git url: "${GIT_URL}"
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                // Add your code quality analysis tool here
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                sh 'npm start &' // Start your application in the background
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the application...'
                // Add your release steps here
            }
        }
        stage('Monitoring & Alerting') {
            steps {
                echo 'Setting up Monitoring and Alerting...'
                // Add your monitoring and alerting setup here
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
            echo 'Pipeline failed!'
        }
    }
}
