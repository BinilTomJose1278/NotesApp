pipeline {
    agent any

    tools {
        nodejs 'NodeJS_16' // This should match the name you configured in Global Tool Configuration
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // Remove or comment the Test stage if no tests are available
        // stage('Test') {
        //     steps {
        //         sh 'npm run test'
        //     }
        // }

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
