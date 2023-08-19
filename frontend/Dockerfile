# # node 기반의 이미지로 build 됨. Dockerfile에서 반드시 있어야 하는 명령
# FROM node
# # 경로 설정. RUM CMD ENTRYPOINT 명렁이 실행될 디렉토리.
# WORKDIR /app
# # package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
# COPY package.json .
# # 명령어 실행 (의존성 설치)
# RUN npm install
# # 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사
# COPY . .
# # 3000번 포트 노출
# EXPOSE 3000
# # npm start 스크립트 실행
# CMD ["npm", "start"]


# nginx 이미지 pull
FROM nginx
# app 디렉토리 생성
WORKDIR /app
# workdir에 build 폴더 생성 /app/build
RUN mkdir ./build
# build에서 build 폴더로 이동
ADD ./build ./build
# nginx의 기본 설정을 삭제
RUN rm -rf /etc/nginx/nginx.conf
# nginx 설정 파일 복사
COPY ./react-nginx.conf /etc/nginx/nginx.conf
# 80포트 오픈하고 nginx 실행
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
