pipeline {
    agent { 
        dockerfile {
            additionalBuildArgs '--build-arg USERPOOLID=${USERPOOLID} --build-arg CLIENTID=${CLIENTID} --build-arg AWS_REGION=${AWS_REGION}'
        } 
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
                sh 'curl http://localhost/'
            }
        }
    }
}
