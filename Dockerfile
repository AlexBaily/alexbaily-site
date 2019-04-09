FROM node:boron

#Set Environment Varialbes
ARG CLIENTID
ARG USERPOOLID
ARG AWS_REGION
ENV CLIENTID=${CLIENTID}
ENV USERPOOLID=${USERPOOLID}
ENV AWS_REGION=${AWS_REGION}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "npm", "start" ]
