FROM node:16-alpine
WORKDIR /app

COPY ./BackEnd ./BackEnd
COPY ./FrontEnd ./FrontEnd

# Installa le dipendenze per il backend
RUN cd BackEnd && npm install

# Costruisci il frontend
RUN cd FrontEnd && npm install && npm run build

# Avvia il backend e servi i file del frontend
CMD ["sh", "-c", "cd BackEnd && npm start"]
