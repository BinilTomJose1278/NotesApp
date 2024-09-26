pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS_17'  // Ensure this matches your NodeJS installation in Jenkins
    }
    
    environment {
        DOCKER_HOST = 'tcp://localhost:2375'  // Docker Desktop configuration for Windows
        PATH = "$PATH:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"  // Linux paths due to WSL2
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
                sh 'npm --version'
                sh 'node --version'
                sh 'npm install'
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
                        sh 'docker info'
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
                    sh 'docker build -t notesapp:${BUILD_ID} .'
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
