# Etapa de construcción
FROM node:16 as build-stage

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --force

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
