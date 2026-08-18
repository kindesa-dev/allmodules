const STUDENTS = [
  {
    id: 'stu-1001',
    fullName: 'Aisha Siddiqui',
    studentId: 'STU-1001',
    department: 'Computer Science',
    year: 3,
    email: 'aisha.siddiqui@university.edu',
    phone: '+1 555-0101',
    avatar: '/avatars/avatar-1.svg',
  },
  {
    id: 'stu-1002',
    fullName: 'Marcus Johnson',
    studentId: 'STU-1002',
    department: 'Business Administration',
    year: 2,
    email: 'marcus.johnson@university.edu',
    phone: '+1 555-0102',
    avatar: '/avatars/avatar-2.svg',
  },
  {
    id: 'stu-1003',
    fullName: 'Daniel Kim',
    studentId: 'STU-1003',
    department: 'Computer Science',
    year: 4,
    email: 'daniel.kim@university.edu',
    phone: '+1 555-0103',
    avatar: '/avatars/avatar-3.svg',
  },
  {
    id: 'stu-1004',
    fullName: 'Sofia Martinez',
    studentId: 'STU-1004',
    department: 'Psychology',
    year: 1,
    email: 'sofia.martinez@university.edu',
    phone: '+1 555-0104',
    avatar: '/avatars/avatar-4.svg',
  },
  {
    id: 'stu-1005',
    fullName: "Ryan O'Connor",
    studentId: 'STU-1005',
    department: 'Mathematics',
    year: 3,
    email: 'ryan.oconnor@university.edu',
    phone: '+1 555-0105',
    avatar: '/avatars/avatar-5.svg',
  },
  {
    id: 'stu-1006',
    fullName: 'Li Wei',
    studentId: 'STU-1006',
    department: 'Computer Science',
    year: 2,
    email: 'li.wei@university.edu',
    phone: '+1 555-0106',
    avatar: '/avatars/avatar-6.svg',
  },
  {
    id: 'stu-1007',
    fullName: 'Emma Parker',
    studentId: 'STU-1007',
    department: 'Biology',
    year: 1,
    email: 'emma.parker@university.edu',
    phone: '+1 555-0107',
    avatar: '/avatars/avatar-7.svg',
  },
  {
    id: 'stu-1008',
    fullName: 'Thomas Chen',
    studentId: 'STU-1008',
    department: 'Physics',
    year: 4,
    email: 'thomas.chen@university.edu',
    phone: '+1 555-0108',
    avatar: '/avatars/avatar-8.svg',
  },
  {
    id: 'stu-1009',
    fullName: 'Nina Hassan',
    studentId: 'STU-1009',
    department: 'Psychology',
    year: 2,
    email: 'nina.hassan@university.edu',
    phone: '+1 555-0109',
    avatar: '/avatars/avatar-9.svg',
  },
  {
    id: 'stu-1010',
    fullName: 'Samuel Brooks',
    studentId: 'STU-1010',
    department: 'Mathematics',
    year: 3,
    email: 'samuel.brooks@university.edu',
    phone: '+1 555-0110',
    avatar: '/avatars/avatar-10.svg',
  },
]

const RESPONSE_DELAY_MS = 700

export function mockStudentApi() {
  return {
    name: 'mock-student-api',

    configureServer(server) {
      server.middlewares.use('/api/students', (req, res) => {
        setTimeout(() => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(STUDENTS))
        }, RESPONSE_DELAY_MS)
      })
    },
  }
}
