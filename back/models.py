from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class Project(Base):
    __tablename__ = "project"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    img = Column(String)
    link = Column(String)
    category_id = Column(Integer, ForeignKey('category.id'))

class Techno(Base):
    __tablename__ = 'technology'

    id = Column(Integer, primary_key=True, index=True)
    name= Column(String)
    icon= Column(String)

class Project_technology(Base):
    __tablename__ = 'project_technology'
    project_id = Column(ForeignKey('project.id'), primary_key=True)
    technology_id = Column(ForeignKey('technology.id'), primary_key=True)