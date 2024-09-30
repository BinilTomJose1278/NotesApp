pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build('biniltomjose12780/nodejs-image-demo')
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    docker.image('biniltomjose12780/nodejs-image-demo').run('-p 3000:3000')
                }
            }
        }
    }
}
