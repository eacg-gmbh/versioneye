FROM        versioneye/ruby-base:2.3.3-14
MAINTAINER  Robert Reiz <reiz@versioneye.com>

RUN rm -Rf /app; \
    mkdir /app

ADD . /app

RUN rm -Rf /aws

RUN cd /app/ && bundle install;

EXPOSE 8080

ENTRYPOINT ["/app/start.sh"]
