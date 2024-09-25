pipeline {
    agent any

    tools {
        nodejs 'NodeJS_16' // Using NodeJS from Global Tool Configuration
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                // Running tests (currently no tests are defined)
                // You can leave it here for future testing or remove it if no tests are planned
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy your application (e.g., build Docker image and run it)
                sh 'docker build -t notesapp .'
                sh 'docker run -d -p 8080:80 notesapp'
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
