pipeline {
    agent any
    tools {
        nodejs 'NodeJS_17' // This should match the name of your Node.js installation in Jenkins
    }
    environment {
        DOCKER_IMAGE = 'note-taking-app:latest'
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
                echo 'Installing dependencies...'
                sh 'npm --version'
                sh 'node --version'
                sh 'npm install'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                // Add linting step here if you set up a linter
                // sh 'npm run lint'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                script {
                    docker.image("${DOCKER_IMAGE}").run('-d --name note-taking-app -p 8080:3000')
                }
            }
        }
        stage('Monitoring & Alerting') {
            steps {
                echo 'Setting up Monitoring and Alerting...'
                // Add monitoring setup here if needed
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
