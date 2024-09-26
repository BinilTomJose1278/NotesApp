pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS_!7' // Make sure this matches the name of your NodeJS installation in Jenkins
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
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("notesapp:${env.BUILD_ID}")
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
