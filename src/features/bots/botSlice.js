import { createSlice } from "@reduxjs/toolkit";

const createInitialBots = () => {
  return Array.from({ length: 10 }).map((_, idx) => ({
    id: idx + 1,
    name: `Bot-${idx + 1}`,
    battery: 50 + Math.floor(Math.random() * 50),
    status: "idle", // idle | busy | charging | error
    currentTask: null,
    speed: 0,
    lastUpdated: new Date().toISOString(),
  }));
};

const initialState = {
  bots: createInitialBots(),
};

const botSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    updateBotsRandomly(state) {
      state.bots = state.bots.map((bot) => {
        const statuses = ["idle", "busy", "charging", "error"];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const batteryChange = Math.floor(Math.random() * 7) - 3; // -3 to +3
        let newBattery = bot.battery + batteryChange;
        if (newBattery > 100) newBattery = 100;
        if (newBattery < 0) newBattery = 0;

        return {
          ...bot,
          status: randomStatus,
          battery: newBattery,
          speed: randomStatus === "busy" ? Math.floor(Math.random() * 5) + 1 : 0,
          lastUpdated: new Date().toISOString(),
        };
      });
    },
  },
});

export const { updateBotsRandomly } = botSlice.actions;
export default botSlice.reducer;
