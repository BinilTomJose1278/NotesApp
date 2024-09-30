pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'note-taking-app:latest' // Example image name
        GIT_URL = 'https://github.com/BinilTomJose1278/NotesApp.git' // Your repository URL
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Use 'sh' instead of 'bat' for Linux
                sh 'echo Building the project on Linux'
                // Example for npm build or Docker build if you're using Node.js or Docker:
                // sh 'npm install'
                // sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Use 'sh' to run tests on Linux
                sh 'echo Running tests on Linux'
                // Example for Node.js testing:
                // sh 'npm test'
            }
        }

        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                // Example SonarQube analysis for Linux:
                sh 'echo Running SonarQube analysis'
                // If using SonarQube or another tool, integrate here
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Use 'sh' for deployment commands on Linux
                sh 'echo Deploying the application on Linux'
                // Example for Docker Compose:
                // sh 'docker-compose up -d'
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing the application...'
                sh 'echo Releasing the application to production'
                // Integrate release management commands (e.g., AWS CodeDeploy, Octopus)
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                echo 'Setting up Monitoring and Alerting...'
                sh 'echo Monitoring production environment on Linux'
                // Integrate monitoring tools like Datadog or New Relic here
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
