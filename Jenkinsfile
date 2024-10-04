pipeline {
    agent {
        label 'docker-agent'
    }

    environment {
        SONAR_TOKEN = credentials('SonarQubeAuthenticationToken')  // Use the correct SonarQube token ID
    }

    tools {
        'hudson.plugins.sonar.SonarRunnerInstallation' 'SonarQubeScanner'  // Correct tool type for SonarQube Scanner
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

        stage('Code Quality Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {  // Replace with the actual SonarQube server name
                        bat 'sonar-scanner -Dsonar.projectKey=NotesApp -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=%SONAR_TOKEN%' 
                    }
                }
            }
        }

        stage('Deploy to Docker Container') {
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
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'One or more stages failed!'
        }
    }
}
