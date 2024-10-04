pipeline {
    agent {
        label 'docker-agent'  // Replace with your specific node label if necessary
    }

    environment {
        // Set your MongoDB URI environment variable here
        MONGODB_URI = 'mongodb+srv://admin03:1234567890@userauthenticationapi.atdala8.mongodb.net/'  // Replace with your MongoDB URI
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
                    
                    // Run the tests with the forceExit option to ensure tests don't hang
                    bat 'npm test -- --forceExit --detectOpenHandles'
                }
            }
        }
    }

    post {
        always {
            echo 'Build and Test stages completed.'
        }
        success {
            echo 'Build and Test stages executed successfully!'
        }
        failure {
            echo 'Build and/or Test stage failed!'
        }
    }
}
