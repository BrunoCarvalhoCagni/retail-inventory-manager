FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate

COPY . .

# Gera o client do prisma dentro do container
RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "run", "dev"]