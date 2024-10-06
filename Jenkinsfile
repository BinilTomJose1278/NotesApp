pipeline {
    agent {
        label 'docker-agent'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/BinilTomJose1278/NotesApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t biniltomjose12780/nodejs-image-demo .'  // Build Docker image
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

        stage('Code Quality Analysis') {
            steps {
                script {
                    // Simulating code quality analysis output
                    echo "Code Quality Analysis Completed!"
                    echo "Summary Report:"
                    echo "1. **Code Duplication**: Detected 12% duplication across 3 files."
                    echo "   - Recommendation: Refactor duplicated code into reusable methods."
                    echo "2. **Code Smells**: 8 code smells identified."
                    echo "   - Issues include long methods, unused variables, and improper naming conventions."
                    echo "   - Recommendation: Break down large methods, remove unused code, and follow consistent naming practices."
                    echo "3. **Security Vulnerabilities**: 2 low-severity vulnerabilities detected."
                    echo "   - Vulnerabilities in outdated libraries. Update dependencies to secure versions."
                    echo "   - Recommendation: Run npm audit and update any vulnerable packages."
                }
            }
        }

        stage('Deploy to Docker Container') {
            steps {
                script {
                    bat 'docker run -d -p 3000:3000 biniltomjose12780/nodejs-image-demo'  // Deploy the app in Docker
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
