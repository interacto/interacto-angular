def githubStatusCheck(String state, String description){
    def commitHash = checkout(scm).GIT_COMMIT
    githubNotify account: 'interacto',sha: "${commitHash}", status: state, description: description, credentialsId: 'github-token', repo: 'interacto-angular'
}


pipeline {
    agent any

    stages {

        stage('Github Pending') {
            steps{
                script{
                    githubStatusCheck("PENDING", "Building the project");
                }
            }
        }

        stage('Node config') {
            steps {
                nodejs(nodeJSInstallationName: 'node12') {
                    sh 'npm -v'
                }
            }
        }

        stage ('Git') {
            steps {
                git branch: 'master', url: "https://github.com/interacto/interacto-angular"
            }
        }

        stage ('NPM install') {
            steps {
                nodejs(nodeJSInstallationName: 'node12') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage ('NPM build') {
            steps {
                nodejs(nodeJSInstallationName: 'node12') {
                    sh '''
                        npm run build-prod
                    '''
                }
            }
        }
    }

    post{
        success {
            githubStatusCheck("SUCCESS", "Build success");
        }
        failure {
            githubStatusCheck("FAILURE", "Build failure");
        }
        unstable {
            githubStatusCheck("FAILURE", "Build failure");
        }
    }
}
