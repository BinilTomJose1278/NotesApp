pipeline {
    agent {
        docker {
            image 'biniltomjose12780/nodejs-image-demo'  // Docker image with Node.js 18 and SonarScanner installed
            reuseNode true  // Reuse the same container for all stages
        }
    }

    environment {
        SONAR_TOKEN = credentials('SonarQubeAuthenticationToken')  // SonarQube token for authentication
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/BinilTomJose1278/NotesApp.git'  // Adjust to your repository
            }
        }

        stage('Install Dependencies and Test') {
            steps {
                script {
                    // Install dependencies and run tests within the container
                    sh 'npm install'  // Installing dependencies
                    sh 'npm test -- --forceExit --detectOpenHandles'  // Running tests
                }
            }
        }

        stage('SonarQube Code Quality Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {  // Use SonarQube configuration from Jenkins
                        sh 'sonar-scanner -Dsonar.projectKey=NotesApp -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=$SONAR_TOKEN'  // Run SonarScanner inside the Docker container
                    }
                }
            }
        }

        stage('Deploy to Docker Container') {
            steps {
                script {
                    // Deploy the application using Docker
                    sh 'docker run -d -p 3000:3000 biniltomjose12780/nodejs-image-demo'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'One or more stages failed!'
        }
    }
}
