import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  Text,
} from '@chakra-ui/react';
import {
  Lock,
  Mail,
  User,
  Upload,
  Camera,
  GraduationCap,
  Info,
} from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  password: string;
  academicYear: string;
  bio: string;
  profileImage: FileList;
};

const academicYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
