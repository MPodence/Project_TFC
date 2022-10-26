FROM node:16.14-alpine
WORKDIR /app-backend
COPY . .
RUN npm install
EXPOSE 3001
ENTRYPOINT [ "" ]

# Não precisa de comando no Dockerfile do backend, pois já está configurado "npm run dev" como comando no docker-compose.