# Backend - Memorial Pet Films

The backend of Memorial Pet Films consists of three main components:
1. **API Server** - Express.js REST API for handling requests
2. 2. **Worker** - FFmpeg-based video rendering service
   3. 3. **Shared Utilities** - Database, S3, and template management
     
      4. ## Directory Structure
     
      5. ```
         backend/
         ├── server/                 ← Express API server
         │   ├── index.js           ← Main server entry point
         │   └── package.json
         ├── worker/                 ← Video rendering worker
         │   ├── index.js           ← Worker entry point
         │   └── package.json
         ├── shared/                 ← Shared modules
         │   ├── db.js              ← Database connections
         │   ├── s3.js              ← AWS S3 client
         │   └── templates.js       ← Email and music templates
         ├── migrations/             ← Database migration scripts
         │   └── 001_initial_schema.sql
         ├── scripts/                ← Utility scripts
         │   └── cleanup.js         ← 30-day retention cleanup
         ├── library-audio/          ← Background music files
         ├── docker-compose.yml      ← Docker service configuration
         ├── Dockerfile.server       ← Server container
         ├── Dockerfile.worker       ← Worker container
         ├── .env.example            ← Environment variables template
         ├── package.json            ← Root package.json
         └── README.md              ← This file
         ```

         ## Quick Start

         ### 1. Install Dependencies

         ```bash
         cd backend
         npm install
         ```

         ### 2. Set Environment Variables

         ```bash
         cp .env.example .env
         # Edit .env with your credentials
         ```

         ### 3. Start Services

         **Option A: Local Development (3 terminals)**

         ```bash
         # Terminal 1: Redis
         redis-server

         # Terminal 2: API Server
         npm run dev

         # Terminal 3: Worker
         npm run worker
         ```

         **Option B: Docker**

         ```bash
         docker-compose up
         ```

         ## Environment Variables

         Required variables in `.env`:

         - `GOOGLE_GEMINI_API_KEY` - Google Gemini API key for AI tributes
         - - `STRIPE_SECRET_KEY` - Stripe API key for payments
           - - `AWS_S3_BUCKET_NAME` - S3 bucket for media storage
             - - `AWS_REGION` - AWS region for S3
               - - `REDIS_URL` - Redis connection URL
                 - - `DATABASE_URL` - PostgreSQL/MongoDB connection string
                   - - `NODE_ENV` - Development or production
                    
                     - ## API Endpoints
                    
                     - ### Health Check
                     - ```bash
                       GET /health
                       ```
                       Returns server health status.

                       ### Create Memorial
                       ```bash
                       POST /api/memorials
                       Content-Type: application/json

                       {
                         "petName": "Buddy",
                         "email": "user@example.com",
                         "photos": [...],
                         "music": "gentle-piano-01",
                         "duration": 60
                       }
                       ```

                       ### Get Memorial Status
                       ```bash
                       GET /api/memorials/:id
                       ```

                       ### Webhook (Video Rendering Complete)
                       ```bash
                       POST /api/webhooks/render-complete
                       ```

                       ## Video Rendering

                       The worker service uses FFmpeg to:
                       1. Combine photos with video transitions
                       2. 2. Add background music
                          3. 3. Create memorial video (MP4)
                             4. 4. Upload to S3
                                5. 5. Send delivery email
                                  
                                   6. Processing typically takes 2-5 minutes per video.
                                  
                                   7. ## Database Cleanup
                                  
                                   8. The cleanup script runs automatically to:
                                   9. - Remove files older than 30 days
                                      - - Clear database records
                                        - - Free S3 storage
                                         
                                          - Manual execution:
                                          - ```bash
                                            npm run cleanup
                                            ```

                                            ## Music Library

                                            Background music files are stored in `library-audio/`. Current tracks:

                                            - `gentle-piano-01.mp3` - Gentle, peaceful piano
                                            - - `soft-strings-01.mp3` - Soft orchestral strings
                                              - - `peaceful-acoustic-01.mp3` - Acoustic guitar
                                                - - `calm-ambient-01.mp3` - Ambient soundscape
                                                  - - `serene-harp-01.mp3` - Solo harp
                                                   
                                                    - ## Debugging
                                                   
                                                    - Enable verbose logging:
                                                    - ```bash
                                                      DEBUG=* npm run dev
                                                      ```

                                                      Check worker logs:
                                                      ```bash
                                                      npm run worker -- --verbose
                                                      ```

                                                      ## Security Considerations

                                                      - All sensitive data is environment-gated
                                                      - - S3 bucket is private by default
                                                        - - Video links expire after 30 days
                                                          - - No user authentication required (anonymity)
                                                            - - Stripe payments are PCI-compliant
                                                             
                                                              - ## Support
                                                             
                                                              - For issues, create a GitHub issue or contact the maintainers.
