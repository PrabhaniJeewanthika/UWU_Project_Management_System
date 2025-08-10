import { NativeSelect } from "@chakra-ui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePageKanbanBoard from "../../ui/PublicUI/HomepageKanbanBoard";
import CalendarArea from "../../ui/PublicUI/CalendarArea";
import Progress from "../../ui/PublicUI/Progress";

type Project = { id: number; name: string };

//const API_BASE = "http://localhost/new_backend/uwu_pms_backend";

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [totalProjects, setTotalProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        // 1) Check auth & role via PHP session/cookie
        const authRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/manager/auth-check.php`, {
          method: "GET",
          credentials: "include", // sends session + cookies
        });
        const authJson = await authRes.json();
        if (!authJson.success) throw new Error("Unauthorized");

        // 2) Load manager stats
        const statsRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/manager/stats.php`, {
          method: "GET",
          credentials: "include",
        });
        const statsJson = await statsRes.json();
        if (!statsJson.success) throw new Error(statsJson.message || "Stats failed");

        setTotalProjects(statsJson.data.totalProjects ?? 0);
        setTotalTasks(statsJson.data.totalTasks ?? 0);
        setTotalMembers(statsJson.data.totalMembers ?? 0);
        setProjects(statsJson.data.projects ?? []);
      } catch (e: any) {
        console.error(e);
        setErr("Please log in again.");
        navigate("/start");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-gray-600">
        Loading dashboard…
      </div>
    );
  }

  if (err) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-red-600">
        {err}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="min-w-[240px]">
          <ProjectSelector items={projects} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <CountView title="Total Projects" count={totalProjects} className="bg-red-800" />
          <CountView title="Total Tasks" count={totalTasks} className="bg-green-800" />
          <CountView title="Total Members" count={totalMembers} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
        <div className="lg:col-span-7 xl:col-span-8">
          <HomePageKanbanBoard />
        </div>
        <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
          <CalendarArea />
          <Progress />
        </div>
      </div>
    </div>
  );
};

const CountView = ({ className, title, count }: { className?: string; title: string; count: number }) => (
  <div className={clsx("rounded-lg p-4 bg-cyan-800 text-white shadow", className)}>
    <div className="text-sm font-medium">{title}</div>
    <div className="font-bold text-3xl">{count}</div>
  </div>
);

const ProjectSelector: React.FC<{ items: Project[] }> = ({ items }) => {
  return (
    <NativeSelect.Root size={"xl"} width="100%" className="border rounded-md">
      <NativeSelect.Field placeholder="Select Project" className="pl-2">
        {items.length === 0 && <option value="">No projects found</option>}
        {items.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
};

export default ManagerDashboard;
