pipeline {
    agent {
        docker {
            image 'docker:latest' // Docker image with Docker pre-installed
            args '-u root --privileged' // Allows Docker-in-Docker (DIND)
        }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy') {
            steps {
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
