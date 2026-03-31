from pydantic import BaseModel
from typing import Optional

# create
class ProjectCreate(BaseModel):
    name : str
    img : Optional[str] = None
    link : Optional[str] = None
    category_id : Optional[int] = None

class CategoryCreate(BaseModel):
    name : str

class TechnoCreate(BaseModel):
    name : str
    icon : Optional[str] = None

# update
class ProjectUpdate(BaseModel):
    name : Optional[str] = None
    img : Optional[str] = None
    link : Optional[str] = None