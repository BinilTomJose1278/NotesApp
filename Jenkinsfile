pipeline {
    agent {
        docker {
            image 'docker:latest' // Docker image with Docker pre-installed
            args '-u root --privileged' // Allows Docker-in-Docker (DIND)
        }
    }
    
    tools {
        nodejs 'NodeJS_16' // Ensure this matches the configured Node.js version
    }

    stages {
        stage('Build') {
            steps {
                // Build Docker image
                echo 'Building Docker image...'
                sh 'docker build -t notesapp .'
            }
        }

        stage('Test') {
            steps {
                // Run automated tests (assuming you have tests defined)
                echo 'Running unit tests...'
                sh 'npm test'
            }
            post {
                success {
                    echo 'Tests passed.'
                }
                failure {
                    echo 'Tests failed.'
                    error('Stopping pipeline due to test failures.')
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                // Example of running SonarQube for code analysis
                echo 'Running code quality analysis...'
                // You can add SonarQube or CodeClimate here
                // sh 'sonar-scanner' (assuming SonarQube is configured)
            }
        }

        stage('Deploy to Staging') {
            steps {
                // Deploy to a staging environment
                echo 'Deploying to Staging Environment...'
                sh 'docker run -d -p 8080:80 --name notesapp-staging notesapp'
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                // Run integration tests on staging
                echo 'Running integration tests on Staging...'
                // Example: Running integration tests (replace with your actual test command)
                sh 'npm run integration-tests'
            }
        }

        stage('Deploy to Production') {
            steps {
                // Deploy to production environment
                echo 'Deploying to Production Environment...'
                sh 'docker run -d -p 80:80 --name notesapp-prod notesapp'
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                echo 'Monitoring production environment...'
                // You can integrate tools like Datadog, New Relic, etc.
                // Example: sh 'datadog-agent status'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/build/**'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
