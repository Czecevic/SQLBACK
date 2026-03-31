from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import MetaData, select
from typing import Dict, Any

from database import get_db, engine

metadata = MetaData()
metadata.reflect(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# route for see all tables 
@app.get('/tables')
def get_table():
    return list(metadata.tables.keys())

# read item
@app.get("/{table_name}")
def get_projects(table_name : str, db: Session = Depends(get_db)):
    table = metadata.tables.get(table_name)
    if table is None: 
        raise HTTPException(status_code=404, detail="Table not found")
    projects = db.execute(select(table)).mappings().all()
    return projects

# create item
@app.post('/{table_name}')
def create_projects(table_name : str, body : Dict[str, Any] = Body(...), db : Session = Depends(get_db)):
    table = metadata.tables.get(table_name)
    if table is None: 
        raise HTTPException(status_code=404, detail="Table not found")
    tableManipulation = table.insert().values(**body)
    db.execute(tableManipulation)
    db.commit()
    return {"status" : "ok", "created" : body}

# put / patch item
@app.put('/{table_name}/{item_id}')
def update_projects(table_name : str, item_id : int, body : Dict[str, Any] = Body(...), db: Session = Depends(get_db)):
    table = metadata.tables.get(table_name)
    if table is None: 
        raise HTTPException(status_code=404, detail="Table not found")
    tableManipulation = (
        table.update().where(table.c.id == item_id).values(**body)
    )
    db.execute(tableManipulation)
    db.commit()
    return {'status': 'ok', 'updated': body}


# @app.delete('/projet')
@app.delete('/{table_name}/{item_id}')
def delete_category(table_name : str, item_id : int, db : Session = Depends(get_db)):
    table = metadata.tables.get(table_name)
    if table is None:
        raise HTTPException(status_code=404, detail="Table not found")
    tableManipulation = table.delete().where(table.c.id == item_id)
    db.execute(tableManipulation)
    db.commit()
    return {"status" : "deleted"}

