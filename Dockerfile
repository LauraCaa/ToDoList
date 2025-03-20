FROM node:21
WORKDIR "/opt/to-do-list"
COPY . ./
COPY package*.json .
RUN npm i
EXPOSE "3000"
CMD ["sleep", "infinity"]