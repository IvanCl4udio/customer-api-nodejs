# Use uma imagem Node.js LTS (Long-Term Support) como base
FROM node:lts

# Define a pasta de trabalho no container
WORKDIR /usr/src/app

# Copia o arquivo de dependências para o container
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante dos arquivos da aplicação para o container
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "node", "index.js" ]
