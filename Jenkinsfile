pipeline {
    agent any
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
                script {
                    // Stop and remove any existing container
                    sh 'docker stop note-taking-app || true'
                    sh 'docker rm note-taking-app || true'
                    
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                    
                    // Run the Docker container
                    sh 'docker run -d --name note-taking-app -p 8080:80 $DOCKER_IMAGE'
                }
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
