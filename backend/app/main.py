from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="STORMCAST AI API",
    description="Backend API for severe weather nowcasting",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


forecast_data = [
    {
        "hour": 0,
        "thunderstorm": 42,
        "hail": 18,
        "cloudburst": 25,
        "lightning": 32,
        "wind": 28,
        "rain": 15,
        "density": 5,
    },
    {
        "hour": 1,
        "thunderstorm": 55,
        "hail": 30,
        "cloudburst": 38,
        "lightning": 48,
        "wind": 40,
        "rain": 24,
        "density": 9,
    },
    {
        "hour": 2,
        "thunderstorm": 72,
        "hail": 52,
        "cloudburst": 61,
        "lightning": 74,
        "wind": 58,
        "rain": 38,
        "density": 15,
    },
    {
        "hour": 3,
        "thunderstorm": 91,
        "hail": 78,
        "cloudburst": 86,
        "lightning": 94,
        "wind": 82,
        "rain": 68,
        "density": 28,
    },
    {
        "hour": 4,
        "thunderstorm": 84,
        "hail": 69,
        "cloudburst": 78,
        "lightning": 87,
        "wind": 74,
        "rain": 57,
        "density": 23,
    },
    {
        "hour": 5,
        "thunderstorm": 68,
        "hail": 48,
        "cloudburst": 59,
        "lightning": 71,
        "wind": 59,
        "rain": 39,
        "density": 14,
    },
    {
        "hour": 6,
        "thunderstorm": 51,
        "hail": 29,
        "cloudburst": 42,
        "lightning": 46,
        "wind": 43,
        "rain": 27,
        "density": 8,
    },
]


@app.get("/")
def root():
    return {
        "message": "STORMCAST AI Backend is running",
        "status": "online",
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "STORMCAST AI Backend",
    }


@app.get("/api/forecast")
def forecast():
    return {
        "location": "Nashik Region",
        "source": "SIMULATED",
        "forecast_hours": 6,
        "data": forecast_data,
    }