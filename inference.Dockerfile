FROM tiangolo/uwsgi-nginx-flask:python3.9

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

WORKDIR /app

# Backup the default app files.  You could also delete these
RUN mkdir bak && \
    mv main.py uwsgi.ini bak


# Copy our files into the current working directory WORKDIR
COPY ./inference ./

# install our dependencies
RUN  pip3 install -r requirements.txt