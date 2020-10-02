pipeline {
    agent { dockerfile true }

    environment {
        CI = 'true' 
    }

    stages {
        // stage('Build') {
        //     steps {
        //         sh 'npm install'
        //     }
        // }
        stage('Test') {
            steps {
		sh 'pwd'
		echo '#############################################'
		sh 'ls'
		echo '#############################################'
                sh 'npm run test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'node_modules/ajv/package.json', fingerprint: true
            junit 'junit.xml'
        }
    }
}
