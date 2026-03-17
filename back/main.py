from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db
from models import Project, Techno, Category, Project_technology


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# read SQL base

@app.get("/projects")
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return projects

@app.get('/technology')
def get_technology(db : Session = Depends(get_db)):
    techno = db.query(Techno).all()
    return techno

@app.get('/category')
def get_category(db : Session = Depends(get_db)):
    category = db.query(Category).all()
    return category

# create post 

# @app.delete('/projet')
@app.delete('/category')
def delete_category(db : Session = Depends(get_db)):
    delete = db.delete(Category)
    return delete