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

const ProfilePage: React.FC = () => {
  const { register, handleSubmit, watch, getValues } = useForm<FormData>({
    defaultValues: {
      name: 'K N P J Ananda',
      email: 'iit22049@std.uwu.ac.lk',
      password: '',
      academicYear: '2nd Year',
      bio: 'I am a 2nd year student at UWU.',
    },
  });