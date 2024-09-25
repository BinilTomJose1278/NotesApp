pipeline {
    agent any

    tools {
        nodejs 'NodeJS_16' // Ensure this matches the configured Node.js version
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
                sh 'docker build -t notesapp .'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Tests'
                // Here you would run your unit/integration tests (e.g., npm test or Dockerized tests)
                sh 'npm test' // Adjust according to your testing framework
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to Staging Environment'
                // Run Docker container in staging environment
                sh '''
                docker run -d -p 8080:80 --name notesapp-staging notesapp
                '''
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Running integration tests on Staging Environment'
                // Add any necessary integration tests here (e.g., using Postman or Selenium)
                // For example, testing API endpoints with Postman in the staging environment
                sh 'npm run integration-tests' // Adjust as per your integration test setup
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to Production Environment'
                // Run Docker container in production environment
                // If deploying to a cloud provider like AWS, include AWS CLI commands
                sh '''
                docker run -d -p 80:80 --name notesapp-prod notesapp
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/build/**'
        }
        success {
            mail to: 'biniltomjose12780@gmail.com',
                 subject: "Pipeline Success: Jenkins Pipeline Completed Successfully",
                 body: "The Jenkins pipeline completed successfully and the application was deployed to production."
            echo 'Pipeline completed successfully!'
        }
        failure {
            mail to: 'biniltomjose12780@gmail.com',
                 subject: "Pipeline Failure: Jenkins Pipeline Encountered a Failure",
                 body: "The Jenkins pipeline encountered a failure during one of the stages."
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
