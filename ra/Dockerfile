FROM node:14
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3006
CMD ["yarn", "start"]
