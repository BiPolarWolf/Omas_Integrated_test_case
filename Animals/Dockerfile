# Используем базовый образ Python
FROM python:3.8

# Устанавливаем переменную окружения PYTHONUNBUFFERED в 1, чтобы вывод из Python был отправлен напрямую в терминал без буферизации
ENV PYTHONUNBUFFERED=1

# Устанавливаем рабочую директорию контейнера
WORKDIR /code

# Копируем файл requirements.txt из текущей директории в контейнер
COPY requirements.txt /code/

# Устанавливаем зависимости Python из файла requirements.txt
RUN pip install -r requirements.txt

# Копируем все файлы из текущей директории в контейнер
COPY . /code/