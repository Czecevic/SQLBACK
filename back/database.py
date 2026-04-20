from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

class Base(DeclarativeBase):
    pass

def get_dynamic_session(database_url : str):
    engine = create_engine(database_url)
    Session = sessionmaker(bind=engine)
    db = Session()
    return db, engine