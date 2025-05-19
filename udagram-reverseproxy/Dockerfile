FROM nginx:alpine

# Remove default config
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom config
COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
