pipeline {
    // 지정 레파지토리, 크레덴셜, 브랜치에서
    // Script Path : Jenkinsfile를 찾아서 실행
    agent any
    
    // tools {
    //     gradle 'Gradle 8.1.1'
    //     jdk 'adoptium 17'
    //     jdk 'jdk17'
    // }

    // environment {
    //     JAVA_HOME = '/opt/java/openjdk/bin/java'
    // }

    stages() {
        stage('Prepare') {
            steps() {
                // 깃 저장소에서 코드 가져오기
                // credentialsId는 jenkins 설정과 일치해야 함
                git url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12A507.git',
                    branch: 'feat/3',
                    credentialsId: 'gitlab'
            }
        }

        stage('Deploy Frontend') {
            when {
                changeset "frontend/**"
            }

            steps {
                dir('frontend') {
                    nodejs(nodeJSInstallationName: 'NodeJS 18.16.1') {
                        sh'''
                            echo "*******Building FRONTEND*******"
                            npm install
                            npm run build
                        '''
                    }
                }
            }
        }

        stage('Deploy Backend') {
            agent {
                docker {
                    image 'gradle:8.2.1-jdk17-alpine'
                    args '-v /root/.m2:/root/.m2'
                }
            }
            // when {
            //     changeset "backend/**"
            // }

            steps {
                echo "changeset working"

                dir('backend') {
                    sh'''
                        echo "********Building BACKEND********W
                        gradlew clean build
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