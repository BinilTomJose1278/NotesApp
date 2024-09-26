pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS_17' // Make sure this matches the name of your NodeJS installation in Jenkins
    }
    
    environment {
        DOCKER_HOST = 'tcp://localhost:2375'  // Docker Desktop uses this by default
        PATH = "$PATH;C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\ProgramData\\DockerDesktop\\bin"  // Docker path for Windows
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                git 'https://github.com/BinilTomJose1278/NotesApp.git'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm --version'
                bat 'node --version'
                bat 'npm install'
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                // Add your code quality analysis steps here
            }
        }
        
        stage('Verify Docker') {
            steps {
                script {
                    try {
                        bat 'docker info'
                        echo 'Docker is available'
                    } catch (Exception e) {
                        error 'Docker is not available. Make sure Docker Desktop is running.'
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t notesapp:%BUILD_ID% .'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add your deployment steps here
            }
        }
        
        stage('Monitoring & Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Add your monitoring and alerting setup here
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
