pipeline {
    agent {
        label 'docker-agent'  // Replace with your specific node label if necessary
    }

    environment {
        SONARQUBE_SERVER = 'SonarQube'  // The name of the SonarQube server configured in Jenkins
    }

    tools {
        sonarQube 'SonarQubeScanner'  // This should match the name you gave when adding SonarQube Scanner in Global Tool Configuration
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
                    withSonarQubeEnv('SonarQube') {  // Name of your SonarQube server in Jenkins
                        withCredentials([string(credentialsId: 'SonarQubeAuthenticationToken', variable: 'SONAR_TOKEN')]) {
                            bat '''
                                sonar-scanner ^
                                -Dsonar.projectKey=NotesApp ^
                                -Dsonar.sources=. ^
                                -Dsonar.host.url=%SONARQUBE_SERVER% ^
                                -Dsonar.login=%SONAR_TOKEN%
                            '''
                        }
                    }
                }
            }
        }

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
