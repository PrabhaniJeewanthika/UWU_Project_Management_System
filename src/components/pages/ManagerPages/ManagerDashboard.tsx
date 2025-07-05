import {
    NativeSelect
} from "@chakra-ui/react";
import clsx from 'clsx';
import React from 'react';
import { Outlet } from "react-router-dom";

const ManagerDashboard = () => {
    return (
        <div className='flex flex-col gap-6 px-4 py-6'>
            <div className="flex justify-between items-center gap-4 flex-wrap">
                <div className="min-w-[240px]">
                    <ProjectSelector />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    <CountView title="Total Projects" count={100} className="bg-red-800" />
                    <CountView title="Total Tasks" count={100} className="bg-green-800" />
                    <CountView title="Total Members" count={100} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
                <div className="lg:col-span-7 xl:col-span-8">

                </div>
                <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
                    
                </div>
            </div>
        </div>
    );
};

const CountView = ({ className, title, count }: any) => {
    return (
        <div className={clsx('rounded-lg p-4 bg-cyan-800 text-white shadow', className)}>
            <div className='text-sm font-medium'>{title}</div>
            <div className='font-bold text-3xl'>{count}</div>
        </div>
    );
};

const ProjectSelector = () => {
    const items = [
        { label: "React.js", value: "react" },
        { label: "Vue.js", value: "vue" },
        { label: "Angular", value: "angular" },
        { label: "Svelte", value: "svelte" },
        { label: "Laravel", value: "laravel" },
        { label: "Spring Boot", value: "spring" },
    ];

    return (
        <NativeSelect.Root size={'xl'} width="100%" className="border rounded-md">
            <NativeSelect.Field placeholder="Select Project" className="pl-2">
                {items.map((line, idx) => (
                    <option key={idx} value={line.value}>{line.label}</option>
                ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
        </NativeSelect.Root>
    );
};

export default ManagerDashboard;
