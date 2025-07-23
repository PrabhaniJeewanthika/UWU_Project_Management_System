import React, { useState, useEffect } from 'react';
import { Fade } from "@chakra-ui/transition";
import { useToast } from '@chakra-ui/toast';
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Badge,
    Stack,
} from '@chakra-ui/react';
import axios from 'axios';

type Notice = {
    id: string;
    title: string;
    description: string;
    time: string;
};

const ManagerNoticePage: React.FC = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const toast = useToast();
    const noticeApiUrl = 'http://localhost/api/public/notice_api.php';

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await axios.get<Notice[] | any>(noticeApiUrl);
            setNotices(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            toast({ title: 'Failed to load notices.', status: 'error' });
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-4">
            <Heading mb={6} color="teal.700">
                All Notices
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
                {notices.map((notice) => (
                    <Fade in key={notice.id}>
                        <Box
                            p={4}
                            bg="white"
                            borderRadius="lg"
                            boxShadow="md"
                            _hover={{
                                boxShadow: 'lg',
                                transform: 'translateY(-4px)',
                                transition: '0.2s',
                            }}
                        >
                            <Stack gap={2}>
                                <Text fontWeight="bold" fontSize="lg">
                                    {notice.title}
                                </Text>
                                <Text fontSize="sm" color="gray.700">
                                    {notice.description}
                                </Text>
                                <Badge colorScheme="purple" fontSize="0.75em" alignSelf="flex-start">
                                    {new Date(notice.time).toLocaleString()}
                                </Badge>
                            </Stack>
                        </Box>
                    </Fade>
                ))}
            </SimpleGrid>

        </div>
    );
};

export default ManagerNoticePage;
