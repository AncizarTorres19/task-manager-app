'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Auth } from "@/components/Auth";
import { TaskCard } from "@/components/TaskCard";
import axiosClient from './config/AxiosClient';

const Page = () => {
  const [userInSession, setUserInSession] = useState<{ id: number } | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  const getUserTasks = async () => {
    if (!userInSession) return;
    try {
      const { data } = await axiosClient.get(`tasks/${userInSession.id}`)
      console.log(data);
      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserTasks();
  }, [userInSession]);

  return (
    <>
      {!userInSession && (
        <div className="flex justify-center items-center h-screen">
          <Auth setUserInSession={(user: Dispatch<SetStateAction<{ id: number; } | null>>) => setUserInSession(user)} />
        </div>
      )}
      {userInSession && (
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
          {(tasks.length === 0 && userInSession) && <span>No hay tareas</span>}
        </div>
      )}
    </>
  );
}

export default Page;
