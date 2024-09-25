pipeline {
    agent any

    tools {
        nodejs 'NodeJS_16' // Make sure the Node.js version is configured in Jenkins
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image
                echo 'Building Docker image...'
                sh 'docker build -t notesapp .'
            }
        }

        stage('Test') {
            steps {
                // Run tests
                echo 'Running tests...'
                sh 'npm test' // Assuming you have tests set up in your project
            }
        }

        stage('Deploy to Staging') {
            steps {
                // Deploy to a staging environment
                echo 'Deploying to staging...'
                sh 'docker run -d -p 8080:80 --name notesapp-staging notesapp'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
