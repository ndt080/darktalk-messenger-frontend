FROM python:3
ENV PYTHONBUFFERED=1
ENV SECRET_KEY="django-insecure-lra+xz5d20y$+*m57q7wkjmxlfvr@#096-fvy##+w8k&dsm5_1"
WORKDIR /opt/
COPY . /opt/
RUN python -m pip install --upgrade pip
RUN pip install poetry
RUN poetry config virtualenvs.create false --local
RUN poetry install -n
RUN chmod +x release.sh
RUN python manage.py collectstatic --noinput
