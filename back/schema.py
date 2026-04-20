from pydantic import BaseModel

class ConnectionRequest(BaseModel):
    database_url:str