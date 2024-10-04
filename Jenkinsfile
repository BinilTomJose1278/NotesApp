pipeline {
    agent {
        label 'docker-agent'  // Replace with your specific node label if necessary
    }

    environment {
        MONGODB_URI = 'mongodb+srv://admin03:1234567890@userauthenticationapi.atdala8.mongodb.net/'
        SONARQUBE_SERVER = 'http://localhost:9000'  // Replace with your SonarQube server URL
    }

    stages {
        // Stage 1: Checkout code from Git repository
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/BinilTomJose1278/NotesApp.git'  // Replace with your repo URL
            }
        }

        // Stage 2: Build Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t biniltomjose12780/nodejs-image-demo .'  // Replace with your Docker image details
                }
            }
        }

        // Stage 3: Run Tests
        stage('Test') {
            steps {
                script {
                    // Install dependencies
                    bat 'npm install'
                    
                    // Run the tests with the environment variable
                    bat 'npm test -- --forceExit --detectOpenHandles'
                }
            }
        }

        // Stage 4: Code Quality Analysis using SonarQube
        stage('Code Quality Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {  // Ensure 'SonarQube' matches the server name you configured in Jenkins
                        withCredentials([string(credentialsId: 'SonarQubeAuthenticationToken', variable: 'SONAR_TOKEN')]) {
                            bat 'sonar-scanner -Dsonar.projectKey=NotesApp -Dsonar.sources=. -Dsonar.host.url=$SONARQUBE_SERVER -Dsonar.login=$SONAR_TOKEN'
                        }
                    }
                }
            }
        }

        // Stage 5: Deploy to Docker Container
        stage('Deploy to Docker Container') {
            steps {
                script {
                    bat 'docker stop notesapp-container || true'
                    bat 'docker rm notesapp-container || true'
                    bat 'docker run -d --name notesapp-container -p 3000:3000 biniltomjose12780/nodejs-image-demo'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline stages completed.'
        }
        success {
            echo 'Build, Test, Code Quality Analysis, and Deployment completed successfully!'
        }
        failure {
            echo 'One or more stages failed!'
        }
    }
}
