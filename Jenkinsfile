pipeline {
    agent any

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/idbswnd1000/react_query_json_server_project.git'
            }
        }

        stage('React Install') {
            steps {
                sh 'cd frontend && npm install'
            }
        }

        stage('React Build') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }

        stage('Docker Compose Down') {
            steps {
                sh '''
                    docker rm -f frontend backend nginx || true
                '''
            }
        }

        stage('Docker Compose Up') {
            steps {
                sh 'docker-compose up -d frontend backend nginx'
            }
        }
    }
}