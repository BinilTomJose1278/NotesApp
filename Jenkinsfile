pipeline {
    agent {
        label 'docker-agent'  // Replace with your specific node label if necessary
    }

    environment {
        MONGODB_URI = 'mongodb+srv://admin03:1234567890@userauthenticationapi.atdala8.mongodb.net/'
        SONARQUBE_SERVER = 'http://localhost:9000'  // Replace with the URL of your SonarQube server
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/BinilTomJose1278/NotesApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t biniltomjose12780/nodejs-image-demo .'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npm test -- --forceExit --detectOpenHandles'
                }
            }
        }

        // Code Quality Analysis Stage using SonarQube and Jenkins credentials
        stage('Code Quality Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {  // Match the name of your SonarQube server configuration in Jenkins
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            bat 'sonar-scanner -Dsonar.projectKey=NotesApp -Dsonar.sources=. -Dsonar.host.url=$SONARQUBE_SERVER -Dsonar.login=$SONAR_TOKEN'
                        }
                    }
                }
            }
        }

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
            echo 'Build, Test, Code Quality, and Deployment completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
