FROM node:18

WORKDIR /usr/src/app

RUN mkdir react-app

WORKDIR /usr/src/app/react-app

COPY react-app/package.json .

COPY react-app/package-lock.json .

RUN npm i

CMD npm run dev