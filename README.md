# delivery-app-backend

1.Open the terminal

2.Install all dependencies: npm i

3.To connect to the database create a file (.env) in the root of the application and create two parametrs:
PORT: 4040 // not required. If you don't write a port for project he will be run in default port:8080
POSTGRES_URL=postgres://default:iVZOBAPX12Im@ep-misty-lab-048749-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require // required

4.Run the application in development mode: npm run start:dev
App will be run in http://localhost:PORT
