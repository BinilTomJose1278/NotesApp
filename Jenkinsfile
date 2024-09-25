pipeline {
    agent any

    tools {
        nodejs 'NodeJS_16' // This should match the name you configured in Global Tool Configuration
    }

    stages {
        stage('Build') {
            steps {
                // npm will be available now that Node.js is installed
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
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
