pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'note-taking-app:latest' // Example image name
        GIT_URL = 'https://github.com/BinilTomJose1278/NotesApp.git' // Your repository URL
    }

    stages {
        // Stage 1: Build
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Install project dependencies using npm
                sh 'npm install'
            }
        }

        // Stage 2: Test
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Running tests (e.g., for Node.js)
                sh 'npm test'
            }
        }

        // Stage 3: Code Quality Analysis
        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                // Here you would run SonarQube, ESLint, or other code quality tools
                // Example:
                // sh 'sonar-scanner'
            }
        }

        // Stage 4: Deploy (Docker-based)
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Build the Docker image using the Dockerfile
                sh 'docker build -t $DOCKER_IMAGE .'

                // Run the Docker container and map the port 8080 on the host to port 80 on the container
                sh 'docker run -d -p 8080:80 $DOCKER_IMAGE'
            }
        }

        // Stage 5: Release (Optional)
        stage('Release') {
            steps {
                echo 'Releasing the application...'
                // If you're using any release tools (e.g., AWS CodeDeploy), you can integrate them here
            }
        }

        // Stage 6: Monitoring & Alerting (Optional)
        stage('Monitoring & Alerting') {
            steps {
                echo 'Setting up Monitoring and Alerting...'
                // Integrate monitoring tools like Datadog or New Relic here
            }
        }
    }

    post {
        // Always clean up the workspace after the pipeline finishes
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }

        // Success message
        success {
            echo 'Pipeline completed successfully!'
        }

        // Failure message
        failure {
            echo 'Pipeline failed!'
        }
    }
}
