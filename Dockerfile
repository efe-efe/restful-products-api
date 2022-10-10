FROM node:16.13.2

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm run dev