DATABASE README 

1 - Have Docker installed
2 - Run docker compose up -d
3 - Check with docker ps (the amentoria-postgres container should be “Up”)
4 - Access the database: docker exec -it amentoria-postgres psql -U amentoria_user -d amentoria
5 - Inside the database, list tables: \dt
6 - Exit the database: \q
7 - To run the backend: uvicorn main:app --reload
8 - Access: http://127.0.0.1:8000
 (docs at /docs)