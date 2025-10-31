import psycopg2
from psycopg2 import OperationalError


def try_conn(dsn: str, label: str) -> None:
    print(f"\n=== {label} ===")
    try:
        conn = psycopg2.connect(dsn)
        print("OK: connection established")
        conn.close()
    except OperationalError as e:
        print("Auth/Conn error:", repr(e))
    except Exception as e:
        print("Error:", repr(e))


host = "127.0.0.1"
port = 5432
dbname = "asia_trans_cargo"
user = "atc_user"

# Passwords to test
pw_backend_env = "q/O*24y5!EJ6;B5iL"  # current backend/.env
pw_env_example = "4NsgB1ekeJ9e6Sf"     # root .env.example

# Use libpq keyword connection string to avoid URL parsing issues with special chars
dsn_backend = f"host={host} port={port} dbname={dbname} user={user} password={pw_backend_env}"
dsn_example = f"host={host} port={port} dbname={dbname} user={user} password={pw_env_example}"

try_conn(dsn_backend, "atc_user with backend/.env password")
try_conn(dsn_example, "atc_user with .env.example password")