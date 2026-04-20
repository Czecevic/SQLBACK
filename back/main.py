from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import MetaData, select, text
from typing import Dict, Any
from database import get_dynamic_session
from schema import ConnectionRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def helper(database_url : str, table_name: str):
        db, engine = get_dynamic_session(database_url)
        metadata = MetaData()
        metadata.reflect(bind=engine)
        table = metadata.tables.get(table_name)
        if table is None: 
            raise HTTPException(status_code=404, detail="Table not found")
        return db, table

# Connect + return tables
@app.post('/connect')
def connect(body : ConnectionRequest):
    try :
        db, engine = get_dynamic_session(body.database_url)
        db.execute(text("SELECT 1"))
        metadata = MetaData()
        metadata.reflect(bind=engine)
        return {"status" : "ok", "tables" : list(metadata.tables.keys())}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# read item
@app.post("/{table_name}/rows")
def get_rows(table_name : str, body: ConnectionRequest):
    try :
        db, table = helper(body.database_url, table_name)
        rows = db.execute(select(table)).mappings().all()
        return list(rows)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str)
    

# create item
@app.post('/{table_name}')
def create_rows(table_name : str, body : Dict[str, Any] = Body(...)):
    try:
        db, table = helper(body.pop("database_url"), table_name)
        db.execute(table.insert().values(**body))
        db.commit()
        return {"status": "ok", "created" : body}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str)

# put / patch item
@app.put('/{table_name}/{item_id}')
def update_projects(table_name : str, item_id : int, body : Dict[str, Any] = Body(...)):
    try :
        db, table = helper(body.pop("database_url"), table_name)
        db.execute(table.update().where(table.c.id == item_id).values(**body))
        db.commit()
        return {'status': 'ok', 'updated': body}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str)

# @app.delete('/projet')
@app.delete('/{table_name}/{item_id}')
def delete_category(table_name : str, item_id : int, body : ConnectionRequest):
    try:
        db, table = helper(body.database_url, table_name)
        db.execute(table.delete().where(table.c.id == item_id))
        db.commit()
        return {"status" : "deleted"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str)
