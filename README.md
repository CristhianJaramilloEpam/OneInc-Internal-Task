# OneInc — Long-Running Job Proposal

This repository contains a proposal for OneInc to handle heavy, long-running tasks. It has two parts: a working **prototype** and an **architecture proposal (RFP)**.

---

## Overview

The prototype simulates how the application should work. It uses a clean backend architecture and a modern React frontend. The goal is to show how the final system could behave based on the given requirements.

---

## Project Structure

```
OneInc-Internal-Task/
├── src/
│   ├── Services/
│   │   └── Encoding/               # .NET 10 backend
│   │       ├── Encoding.Domain/
│   │       ├── Encoding.Application/
│   │       ├── Encoding.Infrastructure/
│   │       ├── Encoding.WebApi/
│   │       └── *.Tests/            # Tests for each layer
│   ├── WebApp/                     # React + TypeScript frontend
│   ├── Proxy/                      # Nginx authentication proxy
│   ├── docker-compose.yml
│   └── OneInc.StreamingText.sln
└── OneInc - RFP.pdf               # Architecture proposal document
```

---

## Prototype

### Tech Stack

| Layer    | Technology                                           |
|----------|------------------------------------------------------|
| Backend  | .NET 10, C#, Domain-Driven Design (DDD)              |
| Frontend | React 18, TypeScript, Redux Toolkit, React Hook Form |
| Testing  | xUnit (backend), Jest (frontend)                     |

---

### Run with Docker (recommended)

From the `./src` folder, run:

```bash
docker compose up --build -d
```

When all containers are running, open your browser at:

```
http://localhost:3000
```

**Default credentials:**

| Field    | Value  |
|----------|--------|
| User     | admin  |
| Password | 123456 |

---

### Run Locally

#### Backend

Build and run the `Encoding.WebApi` project. The API will be available at:

```
https://localhost:7014
```

#### Frontend

From the `./src/WebApp` folder, install the dependencies and start the app:

```bash
npm install
npm run serve
```

**Environment setup** — create a `.env` file in `./src/WebApp/` with the following content:

```env
API_URL=https://localhost:7014/
```

---

## Architecture Proposal (RFP)

For a full solution that supports heavy tasks in production, an architecture design document is included. It explains the proposed system, how it scales, and how it meets the requirements.

> **Document:** [`./OneInc - RFP.pdf`](./OneInc%20-%20RFP.pdf)
