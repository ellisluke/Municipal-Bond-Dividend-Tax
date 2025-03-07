FROM node:18

ENV PORT=3000

WORKDIR /

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]
