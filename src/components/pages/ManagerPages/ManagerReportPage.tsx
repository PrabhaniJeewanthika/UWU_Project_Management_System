import React from 'react';
import { FileText } from 'lucide-react';
import { Box, Input } from '@chakra-ui/react';
import { LuSearch } from "react-icons/lu";

const ManagerReportPage = () => {
    return (
        <div className='flex flex-col gap-6 pb-4'>
            <div className='flex justify-between'>
                <div>
                    <div className='font-bold text-3xl flex gap-2 items-center'>
                        <FileText size={30} />
                        Reports
                    </div>
                    <div className='text text-xs'>Access project reports and Gantt charts</div>
                </div>

                <div className='flex gap-3 items-center'>
                    <Box position="relative" width="200px" border="1px solid #CBD5E0" borderRadius="md">
                        <Box position="absolute" top="50%" left="8px" transform="translateY(-50%)" zIndex="10">
                            <LuSearch size={16} color="gray" />
                        </Box>
                        <Input
                            type="text"
                            placeholder="Search Reports"
                            pl="30px"
                            size="xs"
                            border="none"
                            borderRadius="md"
                            fontSize={'xs'}
                        />
                    </Box>
                </div>
            </div>

            <div className='flex flex-col border rounded-md'>
                <div className='grid grid-cols-3 font-bold text-sm bg-gray-100 p-2 border-b'>
                    <div className='pl-1'>Project Name</div>
                    <div className='pl-2'>Project Report</div>
                    <div className='pl-2'>Gantt Chart</div>
                </div>
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className='grid grid-cols-3 text-xs p-2 border-b hover:bg-gray-50 transition'>
                        <div className='pl-1'>UWU/IIT/22/0{49 + idx}</div>
                        <div className='pl-2'>K N P J Ananda</div>
                        <div className='pl-2'>iit22{49 + idx}@std.uwu.ac.lk</div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ManagerReportPage;
