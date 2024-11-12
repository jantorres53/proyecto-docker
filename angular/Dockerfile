# Usar la imagen base de Nginx
FROM nginx:stable-alpine

# Crear un volumen
VOLUME /tmp

# Eliminar el contenido de la carpeta /usr/share/nginx/html/*
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos de configuración y el directorio del frontend
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
COPY front /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
