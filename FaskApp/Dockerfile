# Define a imagem base
FROM python:3.9

# Define o diretório de trabalho
WORKDIR /app

# Copia o requirements.txt
COPY requirements.txt .

# Instala as dependências
RUN pip install -r requirements.txt

# Copia o restante do código
COPY . .

# Expõe a porta da aplicação
EXPOSE 5000

# Define o comando que será executado
CMD ["python", "app.py"]
