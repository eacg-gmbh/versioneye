FROM        959013096341.dkr.ecr.eu-central-1.amazonaws.com/versioneye-core:latest
MAINTAINER  Robert Reiz <reiz@versioneye.com>

ENV RAILS_ENV production

RUN rm -rf /app && mkdir /app

ADD . /app

# Install the AWS CLI
RUN apt-get update && apt-get -y install python python-dev python-pip python-setuptools groff less curl zip unzip && cd /tmp && \
    curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" \
    -o "awscli-bundle.zip" && \
    unzip awscli-bundle.zip && \
    ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws && \
    rm awscli-bundle.zip && rm -rf awscli-bundle

RUN cd /app/ && bundle install;

EXPOSE 8080

ENTRYPOINT ["/app/start.sh"]
