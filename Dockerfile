FROM node:8.11.1

WORKDIR /usr/src/face-detection-api

COPY ./ ./

RUN  yarn 

CMD ["/bin/bash"]