# Recipe_Manager

A full-stack web app built with **Django** and **React** that allows users to:

## 🚀 Features

- 🔍 Search and filter recipes by title, category, or ingredients
- ➕ Add, edit, and delete your own recipes
- ✅ Mark recipes as “Tried” or “To Try”
- 🧠 Suggest recipes using AI (Gemini API) based on ingredients you have
- 🖼️ Upload recipe images
- 📱 Responsive UI with clean layout

---

## ⚙️ Project Structure

recipi_app/
├── backend/ # Django backend
│ └── recipe_app/ # Django app (views, models, urls)
├── frontend/ # React app
│ └── src/ # React components

## 🛠️ Setup Instructions

### ✅ Backend (Django)
1. Create virtual environment:
   ```bash
           python -m venv venv
           source venv/bin/activate  # or venv\Scripts\activate on Windows
   
2. Navigate to Backend folder
   ```bash
           cd backend
   
3.  Install dependencies:
    ```bash
       pip install -r requirements.txt
        
4. Apply migrations and run server:
   ```bash
       python manage.py migrate
       python manage.py runserver

### ✅ Frontend (React)
1. Navigate to frontend folder:
   ```bash
        cd frontend
   
2. Install dependencies:
   ```bash
       npm install
   
3. Run React dev server:
    ```bash
       npm start
     


