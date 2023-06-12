# Etapa de construcción
FROM node:16 as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --force

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine as prod
EXPOSE 5173
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
