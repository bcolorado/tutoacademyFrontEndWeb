# Establecer la imagen base
FROM node:16

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install --force

# Copiar el código fuente de la aplicación
COPY . .

# Exponer el puerto 5173
EXPOSE 5173

# Comando para iniciar la aplicación
CMD [ "npm", "run", "dev" ]
