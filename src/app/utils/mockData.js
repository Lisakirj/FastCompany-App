import { useCallback, useEffect, useState } from "react";
import httpService from "../services/http.service";

import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";

const useMockData = () => {
  const statusConsts = {
    idle: "Not started",
    pending: "In process",
    successed: "Done",
    error: "Error occured",
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = professions.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = useCallback(() => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }

    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
  }, [
    count,
    progress,
    status,
    statusConsts.idle,
    statusConsts.pending,
    statusConsts.successed,
    summaryCount,
  ]);

  useEffect(() => {
    updateProgress();
  }, [count, updateProgress]);

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put("profession/" + prof._id, prof);
        incrementCount();
      }
      for (const q of qualities) {
        await httpService.put("quality/" + q._id, q);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put("user/" + user._id, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  return { error, status, progress, initialize };
};
export default useMockData;
