# 베이스 이미지. Dockerfile에서 반드시 있어야 하는 명령
FROM node
# 경로 설정. 이미지 내에서 특정 폴더로 이동
WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json .
# 명령어 실행 (의존성 설치)
RUN npm install
# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사
COPY . .
# 3000번 포트 노출
EXPOSE 3000
# npm start 스크립트 실행
CMD ["npm", "start"]