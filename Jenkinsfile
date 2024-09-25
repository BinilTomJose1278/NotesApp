pipeline {
    agent any

    tools {
        nodejs 'NodeJS_16' // This should still be included to install Node.js dependencies
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Installs Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Deploy') {
            steps {
                // Builds and runs the Docker container
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
