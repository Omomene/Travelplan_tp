
---

# Travel Mate

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)

   * [Frontend](#frontend)
   * [Backend](#backend)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [API Endpoints](#api-endpoints)
8. [Usage](#usage)


---

## Project Overview

**Travel Mate** is a web application that allows users to discover top tourist attractions, plan trips, and save favorite places using the TripAdvisor API. The application is designed for tourists, locals, and professionals seeking recommendations and details about attractions in various countries.

Key functionalities include:

* Browse top attractions via a carousel on the homepage.
* Explore additional recommended attractions in a “You may also like” section.
* View detailed information for each attraction, including photos, reviews, and categories.
* Save favorite attractions to a personal list for easy access later.

---

## Features

* **Home Page**: Top attractions carousel and suggested attractions grid.
* **Attraction Details**: Detailed view of an attraction including images, rating, reviews, and category.
* **Search**: Find attractions by keyword or filter by category.
* **My List**: Save and manage favorite attractions.

---

## Technology Stack

**Backend:**

* Python 3.x
* Django 4.x
* Django REST Framework
* Requests library for TripAdvisor API integration
* SQLite 

**Frontend:**

* React 18 with Vite
* Tailwind CSS for styling
* LocalStorage for saved attractions

---

## Project Structure

### Frontend

```
frontend/
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── pages/
    │   ├── Landing.jsx
    │   ├── Home.jsx
    │   ├── Search.jsx
    │   ├── AttractionDetail.jsx
    │   └── MyList.jsx
    └── components/
        ├── Navbar.jsx
        ├── Carousel.jsx
        ├── AttractionCard.jsx
        ├── FilterBar.jsx
        └── Footer.jsx
```

**Key Frontend Components:**

* **AttractionCard** – Reusable card displaying attraction info and image.
* **Carousel** – Smooth horizontal scroll of top attractions.
* **Navbar & Footer** – Navigation and page footer.
* **FilterBar** – Filters for search page.

---

### Backend

```
travelapp/
└── backend/
    ├── manage.py
    ├── backend/
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── attractions/
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── models.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── tests.py
    ├── db.sqlite3
    └── requirements.txt
```

**Key Backend Features:**

* **API Endpoints** to fetch attractions, photos, and reviews from TripAdvisor.
* **SavedAttraction model** for storing user’s saved attractions.
* **Filter logic** to return top attractions based on country and profile.

---

## Installation

1. **Clone the repository:**

```bash
git clone <repository_url>
cd travelapp
```

2. **Backend setup:**

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. **Frontend setup:**

```bash
cd frontend
npm install
npm run dev
```

4. Open your browser at `http://localhost:5173`

---

## Environment Variables

**Backend (.env):**

```
TRIPADVISOR_API_KEY=your_tripadvisor_api_key
TRIPADVISOR_REFERER=http://localhost:5173
SECRET_KEY=your_django_secret
```

**Frontend (.env):**

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

## API Endpoints

| Endpoint                         | Method     | Description                                |
| -------------------------------- | ---------- | ------------------------------------------ |
| `/api/attractions/home/`         | GET        | Fetch top attractions by country & profile |
| `/api/attractions/search/`       | GET        | Search attractions by query                |
| `/api/attractions/details/<id>/` | GET        | Fetch details of a specific attraction     |
| `/api/attractions/photos/<id>/`  | GET        | Fetch attraction photos                    |
| `/api/attractions/reviews/<id>/` | GET        | Fetch attraction reviews                   |
| `/api/attractions/saved/`        | GET/POST   | List/create saved attractions              |
| `/api/attractions/saved/<id>/`   | GET/DELETE | Retrieve/delete a saved attraction         |

---

## Usage

1. Select your country and profile (tourist, local, professional).
2. Browse top attractions in the **carousel**.
3. Explore additional attractions in the **“You may also like”** section.
4. Click on any attraction card to see details, photos, and reviews.
5. Save attractions for later reference via the **Save** button.
6. Use the search page to find attractions by name or category.

---
