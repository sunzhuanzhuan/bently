#!/bin/sh
echo "  # NodeJS core-node-server
        location / {
            proxy_pass  http://${NG_PROXY_CORE_NODE_SERVER_HOST};
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # PHP hodor
        location ~* ^\/api\/(sendsms|verifysms|cross|wechatAuth|login).* {
            rewrite    ^/api/(.*)$ /api/$1 break;
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://${$NG_PROXY_DOCKER_API_HOST};
        }

        # PHP bentley
        location /api/ {
            rewrite    ^/api/(.*)$ /api/$1 break;
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://${NG_PROXY_API_HOST};
        }

        # PHP uploadservice
        location /upload/ {
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://${NG_PROXY_UPLOAD_HOST};
        }

        # Java weiboyi-files-service
        location /api/common-file/ {
            proxy_pass http://${NG_PROXY_FILES_SERVICE_HOST};
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Java weiboyi-toolbox-gateway
        location /api/toolbox-gateway/ {
            proxy_pass http://${NG_PROXY_TOOLBOX_GATEWAY_HOST};
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Java weiboyi-operator-gateway
        location /api/operator-gateway/ {
            proxy_pass http://${NG_PROXY_OPERATOR_GATEWAY_HOST};
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
              ">/etc/nginx/proxyapi.conf

/usr/sbin/nginx