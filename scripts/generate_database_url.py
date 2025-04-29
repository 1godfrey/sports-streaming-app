def generate_database_url(username, password, host, port, database):
    return f"postgresql://{username}:{password}@{host}:{port}/{database}"

# ✏️ Fill in these details from your pgAdmin 4 connection
username = "postgres"
password = "admin"
host = "localhost"  # or your actual host
port = "5432"       # usually 5432 for local Postgres
database = "sports-streaming-app"

# Generate the URL
database_url = generate_database_url(username, password, host, port, database)

print(f"DATABASE_URL={database_url}")
