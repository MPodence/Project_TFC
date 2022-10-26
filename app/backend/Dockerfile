FROM node:16.14-alpine
WORKDIR /app-backend
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ]

# Mesmo que funcione localmente sem ENTRYPOINT/CMD, no github nao funciona, pois o avaliador tenta usar comandos pra subir o projeto :(