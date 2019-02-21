#Version 1.0  bentley front project basic on alpine

FROM harbor.weiboyi.com/wby/nginx-alpine-base:1.0
MAINTAINER  xuehao  "xuehao@weiboyi.com"

COPY ./build/ /var/www/Core-Bentley/
COPY ./core-bentley.conf /etc/nginx/conf.d/
COPY ./mknginxproxyapiconf.sh /wby/entrypoint-devbox.sh
RUN chmod +x /wby/entrypoint-devbox.sh

VOLUME  ["/var/log/nginx","/var/log/application"]

LABEL aliyun.logs.nginx=stdout aliyun.logs.core_bentley_nginx_access=/var/log/nginx/core_bentley_access-*.log aliyun.logs.core_bentley_nginx_access.tags="name=core_bentley_nginx_access" aliyun.logs.nginx=stdout aliyun.logs.core_bentley_nginx_error=/var/log/nginx/core_bentley_error-*.log aliyun.logs.core_bentley_nginx_error.tags="name=core_bentley_nginx_error"

EXPOSE  80
#Supervisord start nginx php-fpm
CMD ["/wby/entrypoint-devbox.sh"]
