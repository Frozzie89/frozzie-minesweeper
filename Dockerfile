FROM node:23.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . . 

ENV HOST=0.0.0.0
ENV PORT=4200

EXPOSE ${PORT}

CMD ["sh", "-c", "ng serve --host=${HOST} --port=${PORT}"]