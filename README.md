1. add .env file in client and SERVER
  a. client .env FORMAT
       VITE_API_URL=http://localhost:8000/api/v1  (or production server URL)  
  b. sever .env FORMAT
      DB_CONNECT = mongodb connect string from mongodb atlas
      JWT_PRIVATE_KEY = your key 
      FRONTEND_URL = http://localhost:5173/ (or production client URL)


2.Install all the server/client npm packages
  npm install 

3. Running the app 
  a. client = npm run dev 
  b. server = npm run dev
