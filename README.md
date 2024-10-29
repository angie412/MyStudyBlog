1. Project Name
# Angela's Study Room


2. Project Description:

Angela's Study Room is a web application for managing personal study logs and project progress. 
It is built on a Django backend with a user-friendly React interface. 
The administrator can create, edit, and delete posts, while regular users can only view the posts.


3. Key Features:

-Login/Logout: User authentication and role-based access control.
Post Creation/Editing/Deletion: Admin can create, edit, and delete posts.
-Tag-based Filtering: Click on tags to filter posts by specific categories.
-Monthly Post View: View posts organized by month in a card format.


4. Tech Stack:
-Backend: Django (Python), Django REST framework
-Frontend: React.js
-Database: SQLite (development environment)
-API Communication: Axios


5. Project Structure:
/backend                # Django backend code
    /core               # Models, views, serializers
    /backend            # Settings, URL routing
/frontend               # React frontend code
    /components         # React components
    /services           # API service layer


6. Setup and Running the Project:
Backend (Django):

cd backend
python -m venv venv
venv/Scripts/activate
pip install djangorestframework psycopg2-binary
pip install djangorestframework
pip install djangorestframework-authtoken
pip install django-cors-headers

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser
python manage.py runserver


Frontend (React):

npm install react-router-dom
npm start


7. Usage:
-Login: After logging in, administrators can access post creation, editing, and deletion features.
-Post Creation: Click the "+" button to create a new post after logging in.
-Tag Filtering: Use the tag list in the sidebar to filter posts by specific categories.








