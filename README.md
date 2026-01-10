# Memorial Pet Films

A private, beautifully crafted memorial film service to honour a beloved pet.

## Installation & Setup

### 1. Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18 or higher)
- - **Redis Server** (for background job processing)
  - - **FFmpeg** (for video rendering)
   
    - ```bash
      sudo apt-get update
      sudo apt-get install -y nodejs redis-server ffmpeg
      ```

      ### 2. Project Setup

      Clone the repository and install dependencies:

      ```bash
      git clone https://github.com/chimbz82/MemorialPetFilms.git
      cd MemorialPetFilms
      npm install
      cp backend/.env.example backend/.env
      ```

      ### 3. Environment Configuration

      Edit the `backend/.env` file with your specific credentials:

      - **GOOGLE_GEMINI_API_KEY**: For AI-generated tributes.
      - - **STRIPE_SECRET_KEY**: For secure one-time payments.
        - - **AWS_S3_BUCKET_NAME**: For private media storage and delivery.
          - - **REDIS_URL**: For managing the video render queue.
           
            - ### 4. Music Assets
           
            - Place your background music files in the `backend/library-audio/` directory. Ensure the filenames match the IDs defined in `backend/shared/templates.js`:
           
            - - gentle-piano-01.mp3
              - - soft-strings-01.mp3
                - - peaceful-acoustic-01.mp3
                  - - calm-ambient-01.mp3
                    - - serene-harp-01.mp3
                     
                      - ### 5. Start Services
                     
                      - Open three terminal windows/sessions:
                     
                      - **Terminal 1: Redis**
                     
                      - ```bash
                        redis-server
                        ```

                        **Terminal 2: API Server**

                        ```bash
                        cd backend
                        npm run dev
                        ```

                        **Terminal 3: Video Worker**

                        ```bash
                        cd backend
                        npm run worker
                        ```

                        ### 6. Testing

                        Verify the backend is running correctly:

                        ```bash
                        curl http://localhost:5000/health
                        # Expected response: {"status":"healthy", "timestamp": "..."}
                        ```

                        ## Project Structure

                        ```
                        MemorialPetFilms/
                        ├── backend/                    ← All backend code
                        │   ├── server/                 ← Express API server
                        │   ├── worker/                 ← FFmpeg video rendering worker
                        │   ├── shared/                 ← Shared utilities (db, S3, templates)
                        │   ├── migrations/             ← Database migrations
                        │   ├── scripts/                ← Utility scripts (cleanup, etc.)
                        │   ├── library-audio/          ← Background music library
                        │   ├── docker-compose.yml      ← Docker service configuration
                        │   ├── Dockerfile.server       ← Server container image
                        │   ├── Dockerfile.worker       ← Worker container image
                        │   ├── .env.example            ← Environment variables template
                        │   ├── package.json
                        │   └── README.md
                        ├── components/                 ← Frontend React components
                        ├── pages/                      ← Next.js pages
                        └── ... (other frontend files)
                        ```

                        ## Security & Privacy

                        - **No Accounts**: User privacy is maintained by not requiring logins.
                        - - **Encrypted Storage**: Media is stored in private S3 buckets.
                          - - **30-Day Retention**: Automated cleanup script purges all files 30 days after creation.
