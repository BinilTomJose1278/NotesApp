pipeline {
    agent {
        label 'docker-agent'  // Replace with your specific node label if necessary
    }

    environment {
        SONARQUBE_SERVER = 'SonarQube'  // The name of the SonarQube server configured in Jenkins
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
                    withSonarQubeEnv('SonarQube') {
                        withCredentials([string(credentialsId: 'SonarQubeAuthenticationToken', variable: 'SONAR_TOKEN')]) {
                            bat """
                                sonar-scanner \
                                -Dsonar.projectKey=NotesApp \
                                -Dsonar.sources=. \
                                -Dsonar.host.url=$SONARQUBE_SERVER \
                                -Dsonar.login=$SONAR_TOKEN
                            """
                        }
                    }
                }
            }
        }

        // Stage 5: Deploy to Docker Container
        stage('Deploy to Docker Container') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    bat 'docker run -d -p 3000:3000 biniltomjose12780/nodejs-image-demo'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline stages completed.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'One or more stages failed!'
        }
    }
}
