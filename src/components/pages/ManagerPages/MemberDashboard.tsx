import {
    Text,
    Heading
  } from "@chakra-ui/react";
  import clsx from "clsx";
  import HomePageKanbanBoard from "../ui/HomePageKanbanBoard";
  import CalendarArea from "../ui/CalendarArea";
  import Progress from "../ui/Progress";
  import { AppWindow, LayoutDashboard } from "lucide-react";
  
  
  const MemberDashboard = () => {
    return (
      <div className="flex flex-col gap-6 pb-4 px-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center font-bold text-3xl">
              <LayoutDashboard size={30} />
              Welcome, Member
            </div>
            <Text fontSize="sm" color="gray.600">
              Here's a quick overview of your assigned projects and tasks.
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <CountView title="Assigned Projects" count={3} className="bg-slate-800  " />
          <CountView title="Total Tasks" count={10} className="bg-yellow-800" />
          <CountView title="Pending Tasks" count={4} className="bg-red-800" />
        </div>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-8">
            <HomePageKanbanBoard />
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-4">
              <CalendarArea />
              <Progress />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  type CountViewProps = {
    title: string;
    count: number;
    className?: string;
  };
  
  const CountView = ({ title, count, className }: CountViewProps) => (
    <div className={clsx("rounded-md p-4 text-white shadow", className)}>
      <div className="text-md font-semibold">{title}</div>
      <div className="text-3xl font-bold">{count}</div>
    </div>
  )
  
  export default MemberDashboard;