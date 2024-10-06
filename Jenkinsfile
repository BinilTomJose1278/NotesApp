pipeline {
    agent {
        label 'docker-agent'  // Ensure this is the correct Docker agent
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/BinilTomJose1278/NotesApp.git'  // Replace with your GitHub repo URL
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t biniltomjose12780/nodejs-image-demo .'  // Building the Docker image
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat 'npm install'  // Installing dependencies
                    bat 'npm test -- --forceExit --detectOpenHandles'  // Running tests
                }
            }
        }

        stage('Code Climate Analysis') {
            steps {
                script {
                    docker.image('codeclimate/codeclimate').inside {
                        // Running Code Climate analysis within the Docker container
                        bat 'codeclimate analyze'
                    }
                }
            }
        }

        stage('Deploy to Docker Container') {
            steps {
                script {
                    bat 'docker run -d -p 3000:3000 biniltomjose12780/nodejs-image-demo'  // Running the app in a Docker container
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
