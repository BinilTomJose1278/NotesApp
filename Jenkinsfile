pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/BinilTomJose1278/NotesApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t biniltomjose12780/nodejs-image-demo .'
                }
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                script {
                    sh 'sonar-scanner' 
                }
            }
        }
    }
}
