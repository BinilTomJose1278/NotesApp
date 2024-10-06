pipeline {
    agent {
        label 'docker-agent'  // Your Docker agent on Windows
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/BinilTomJose1278/NotesApp.git'  // Your repository
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t biniltomjose12780/nodejs-image-demo .'  // Build the Docker image
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat 'npm install'  // Install dependencies
                    bat 'npm test -- --forceExit --detectOpenHandles'  // Run tests
                }
            }
        }

        stage('Code Climate Analysis') {
            steps {
                script {
                    // Convert Windows path (e.g., C:/jenkins/...) to Linux-style path (/c/jenkins/...) for Docker
                    def workspacePath = pwd().replaceAll('C:', '/c').replaceAll('\\\\', '/')

                    // Use Docker image for Code Climate analysis with corrected Linux-style paths
                    docker.image('codeclimate/codeclimate').inside("-v ${workspacePath}:${workspacePath} -w ${workspacePath}") {
                        bat 'codeclimate analyze'  // Run Code Climate analysis
                    }
                }
            }
        }

        stage('Deploy to Docker Container') {
            steps {
                script {
                    bat 'docker run -d -p 3000:3000 biniltomjose12780/nodejs-image-demo'  // Run the app in a Docker container
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
