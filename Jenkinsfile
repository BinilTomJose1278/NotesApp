pipeline {
    agent {
        label 'docker-agent'  // Your Docker agent on Windows
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/BinilTomJose1278/NotesApp.git'  // Your repository
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t biniltomjose12780/nodejs-image-demo .'  // Build the Docker image
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat 'npm install'  // Install dependencies
                    bat 'npm test -- --forceExit --detectOpenHandles'  // Run tests
                }
            }
        }

        stage('Code Climate Analysis') {
            steps {
                script {
                    // Convert the Jenkins workspace path from Windows format to Linux format for Docker
                    def workspacePath = pwd().replaceAll('C:', '/c').replaceAll('\\\\', '/')

                    // Print out the converted workspace path for debugging (optional, you can remove this later)
                    echo "Converted workspace path: ${workspacePath}"

                    // Run Code Climate analysis inside the Docker container with the corrected Linux-style path
                    docker.image('codeclimate/codeclimate').inside("-v ${workspacePath}:${workspacePath} -w ${workspacePath}") {
                        bat 'codeclimate analyze'  // Run Code Climate analysis
                    }
                }
            }
        }

        stage('Deploy to Docker Container') {
            steps {
                script {
                    bat 'docker run -d -p 3000:3000 biniltomjose12780/nodejs-image-demo'  // Run the app in a Docker container
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline stages completed.'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'One or more stages failed!'
        }
    }
}
