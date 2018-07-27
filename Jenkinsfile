pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/VladyslavStepanenko/expenses.git'
            }
        }
        stage('Build') {
            steps {
                sh "npm start"
            }
        }
        stage('Deploy') {
            steps {
                sh "echo deploying..."
            }
        }
    }
}