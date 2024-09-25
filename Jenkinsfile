pipeline {
    agent any

    stages {
        // Step 4: Build Stage
        stage('Build') {
            steps {
                // Installing dependencies and building the app
                sh 'npm install'
                sh 'npm run build'
            }
        }

        // Step 5: Test Stage
        stage('Test') {
            steps {
                // Running tests
                sh 'npm run test'
            }
        }

        // Step 7: Deploy Stage
        stage('Deploy') {
            steps {
                // Deploying the app using Docker
                sh 'docker build -t notesapp .'
                sh 'docker run -d -p 8080:80 notesapp'
            }
        }
    }

    post {
        always {
            // Archiving build artifacts (optional)
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
