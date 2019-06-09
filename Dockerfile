FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./project /usr/src/app

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000

CMD ["npm","run","start"]
