pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                scriot {
                    checkout scm

                    def siteImage = docker.build("frontend:1", "--build-arg USERPOOLID=${USERPOOLID} --build-arg CLIENTID=${CLIENTID} --build-arg AWS_REGION=${AWS_REGION} .")
                } 
            }
        }
    }
}
