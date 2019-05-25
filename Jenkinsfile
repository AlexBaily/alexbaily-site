pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                script {

                    def siteImage = docker.build("alexsite-frontend:${env.BUILD_ID}", "--build-arg USERPOOLID=${USERPOOLID} --build-arg CLIENTID=${CLIENTID} --build-arg AWS_REGION=${AWS_REGION} .")
                    siteImage.inside {
                        sh 'echo "Inside the container"'
                    }
                    siteImage.push('latest')
                } 
            }
        }
    }
}
