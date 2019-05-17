pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                script {
                    checkout scm

                    def siteImage = docker.build("frontend:1", "--build-arg USERPOOLID=${USERPOOLID} --build-arg CLIENTID=${CLIENTID} --build-arg AWS_REGION=${AWS_REGION} .")
                    siteImage.inside {
                        sh 'curl http://localhost/'
                    }
                } 
            }
        }
    }
}
