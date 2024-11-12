# Usar la imagen base de Node.js
FROM node:18.17.1-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json al directorio de trabajo
COPY package-lock.json .
COPY package.json .

# Instalar las dependencias
RUN npm install

# Copiar todo el directorio del proyecto al contenedor
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "build/index.js"]