pipeline {
    agent any
    stages {
        stage('Checkout scm') {
            steps {
                git url: 'https://github.com/VladyslavStepanenko/expenses.git'
            }
        }
        stage('Docker Build') {
            steps {
                sh "docker build -t vladstepanenko/expenses-manager ."
            }
        }
        stage("Docker Push"){
            steps{
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUsername')]) {
                    sh "docker login -u ${env.dockerHubUsername} -p ${env.dockerHubPassword}"
                    sh 'docker push vladstepanenko/expenses-manager:latest'
                }
            }
        }
    }
}