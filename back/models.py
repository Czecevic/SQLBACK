from database import engine
from sqlalchemy import MetaData


metadata = MetaData()
metadata.reflect(bind=engine)