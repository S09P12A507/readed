pipeline {
    // 지정 레파지토리, 크레덴셜, 브랜치에서
    // Script Path : Jenkinsfile를 찾아서 실행
    agent any

    stages() {
        stage('Prepare') {
            steps() {
                // 깃 저장소에서 코드 가져오기
                // credentialsId는 jenkins 설정과 일치해야 함
                git url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12A507.git',
                    branch: 'develop',
                    credentialsId: 'gitlab'
            }
        }

        stage('jenkins in jenkins test') {
            steps {
                echo 'step 1'
                load 'backend/Jenkinsfile'  

                echo 'step 2'
                load 'frontend/Jenkinsfile'  
            }
        }

        stage('Deploy Frontend') {
            when {
                changeset "frontend"
            }

            steps {
                dir('frontend') {

                }
            }
        }

        stage('Deploy Backend') {
            when {
                changeset "backend"
            }

            steps {
                dir('backend') {
                    sh'''
                        echo [BE] Build Start!
                        ./gradlew clean build
                        echo [BE] Build Docker Image!
                        docker build -t server .
                        echo [BE] Run Docker Container!
                        docker run -dp 3000:3000 server
                    '''
                }
            }
        }
    }
}