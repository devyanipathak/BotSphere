# 🤖 BotSphere — Warehouse Automation Dashboard

BotSphere is a **real-time warehouse robot monitoring and task management dashboard** built as part of an internship evaluation assignment.  
It simulates how modern automated warehouses monitor robots, assign tasks, process queues, visualize analytics, and track live movement on a warehouse map.

This project demonstrates **frontend system design, real-time UI updates, state management, data visualization, and interactive UI/UX** using modern React tools.


---

## 🧠 Problem Statement

Design and implement a **warehouse automation dashboard** that allows:
- Monitoring robot status in real time  
- Assigning pickup & drop tasks  
- Automatically processing task queues  
- Viewing analytics and insights  
- Visualizing robot movement on a warehouse map  

The application must work **without a real backend**, using simulated data and global state management.

---

## ⚙️ Tech Stack

- ⚛️ **React (Vite)**
- 🗂 **Redux Toolkit**
- 🧭 **React Router DOM**
- 🎨 **Tailwind CSS**
- 📊 **Recharts (Analytics)**
- 🗺 **SVG + Canvas Simulation (Map)**
- 🎞 **CSS Animations**
- 📦 **Node + npm**

---

## ✨ Core Features

### ✅ Authentication (Login + Signup Toggle)
- Single-page **Login/Signup toggle**
- Simulated authentication using Redux
- No `localStorage` used (as per requirement)
- Protected routes for all dashboard pages
- Premium branded UI with BotSphere branding


---

### ✅ Dashboard (Home)
- Live KPI cards:
  - Total Bots
  - Active Bots
  - Idle Bots
  - Bots in Error
  - Pending Tasks
- Color-coded gradient cards
- Animated hover effects
- Real-time values derived from global state


---

### ✅ Bot Status (Real-Time Monitoring)
- Displays all robots as **status cards**
- Each bot shows:
  - Battery %
  - Current Status (idle, busy, charging, error)
  - Speed
  - Last Updated timestamp
- **Auto-updates every 10 seconds**
- Status-based colors
- Battery progress bars
- Live telemetry simulation


---

### ✅ Task Allocation
- Interactive task creation form:
  - Pickup location
  - Drop location
  - Priority (low, medium, high)
  - Operator comments
- Success animation after creating task
- Tasks added directly to the global task queue


---

### ✅ Task Queue (Automated Scheduler)
- Displays all pending tasks
- **FIFO queue simulation**
- Automatically removes one task every **3 seconds**
- Priority-based highlighting
- Live countdown timer for automated assignment
- Live "queue processing" simulation


---

### ✅ Analytics & Insights
- **Interactive Charts**
  - Pie Chart → Bot Status Distribution
  - Bar Chart → Tasks by Priority
- Live data directly from Redux store
- KPI indicators
- Live update badge
- Color legend with business meaning:

| Color | Meaning |
|-------|---------|
| 🟢 Green | Active / Healthy |
| 🟡 Yellow | Idle / Medium Load |
| 🔵 Blue | Charging |
| 🔴 Red | Error / Fault |

---

### ✅ Warehouse Map (Bonus Feature)
- SVG warehouse layout upload
- Live robot movement simulation
- Status-based colored bot indicators
- Grid overlay for realism
- Tooltip showing bot name & status
- Live movement every 2 seconds


---


All application data flows through **centralized global state**, simulating a real-world backend-driven dashboard.

---

## 🔁 Real-Time Simulation Logic

| Feature | Simulation |
|--------|------------|
| Bot updates | Randomized every 10 seconds |
| Task queue | Auto dequeue every 3 seconds |
| Map movement | Random positions every 2 seconds |
| Analytics | Derived live from Redux state |

This simulates how **real IoT & logistics dashboards** behave.

---

## ▶️ How to Run Locally

```bash
# 1. Clone the repository
git clone <your-repo-url>

# 2. Navigate to project
cd botsphere

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

