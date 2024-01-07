FROM python:3.9-buster

RUN apt-get update
RUN apt-get install -y  build-essential \
                        software-properties-common \
                        apt-transport-https \
                        build-essential \
                        ca-certificates \
                        checkinstall \
                        netcat \
                        iputils-ping

RUN pip3 install --upgrade pip
RUN pip3 install poetry

WORKDIR /app

# Copy our files into the current working directory WORKDIR
COPY ./inference ./

# install our dependencies
RUN poetry install

ENTRYPOINT ["poetry", "run", "python", "app.py"]