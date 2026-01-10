# Memorial Pet Films

A private, beautifully crafted memorial film service to honour a beloved pet.

## Installation & Setup

### 1. Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **Redis Server** (for background job processing)
- **FFmpeg** (for video rendering)

```bash
sudo apt-get update
sudo apt-get install -y nodejs redis-server ffmpeg
```

### 2. Project Setup
Clone the repository and install dependencies:

```bash
cd memorial-pet-films
npm install
cp .env.example .env
```

### 3. Environment Configuration
Edit the `.env` file with your specific credentials:
- **Google Gemini API**: For AI-generated tributes.
- **Stripe**: For secure one-time payments.
- **AWS S3**: For private media storage and delivery.
- **Redis**: For managing the video render queue.

### 4. Music Assets
Place your background music files in the `backend/music/` directory. Ensure the filenames match the IDs defined in `backend/src/services/musicLibraryService.js`:
- `gentle-piano-01.mp3`
- `soft-strings-01.mp3`
- `peaceful-acoustic-01.mp3`
- `calm-ambient-01.mp3`
- `serene-harp-01.mp3`

### 5. Start Services
Open three terminal windows/sessions:

**Terminal 1: Redis**
```bash
redis-server
```

**Terminal 2: API Server**
```bash
npm run dev
```

**Terminal 3: Video Worker**
```bash
npm run worker
```

### 6. Testing
Verify the backend is running correctly:
```bash
curl http://localhost:5000/health
# Expected response: {"status":"healthy", "timestamp": "..."}
```

## Security & Privacy
- **No Accounts**: User privacy is maintained by not requiring logins.
- **Encrypted Storage**: Media is stored in private S3 buckets.
- **30-Day Retention**: Automated cleanup script purges all files 30 days after creation.
