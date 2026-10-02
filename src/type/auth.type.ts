
export interface ILogin{
    email:string
    password:string
}

export interface IRegister{
    email:string,
    password:string,
    phone:string,
    name:string,
    
}

export interface IUpdatePassword{
    email:string,
    token:string,
    password:string,
    confirmPassword:string
}

// name              String
//   email             String                @unique
//   password          String?
//   emailVerified     Boolean               @default(false)
//   role              Role                  @default(STUDENT)
//   userStatus         UserStatus           @default(PENDING)
//   authProvider      AuthProvider          @default(CREDENTIAL)
//   imageUrl          String                @default("")
//   imagePublicId     String                @default("")
//   studentProfile    StudentProfile?       @relation("studentProfile")
//   instructorProfile InstructorProfile?    @relation("instructorProfile")
//   googleId          String?
//   isEnrolled        Boolean?        
//   createdAt         DateTime              @default(now())
//   updatedAt         DateTime              @updatedAt
//   payments          Payment[]
//   application       AdmissionApplication?
//   courseAssignments CourseAssignt[]
//   fees              Fee[]
//   instructorExams   Exam[]                @relation("InstructorExams")
//   studentResults    Result[]              @relation("StudentResults")
//   gpaResult         GPAResult[]
//   corseResult       CourseMarks[]         @relation("studentCourseResult")
//   enrolledment      Enrollment[]
//   auditLog          AuditLog[]
//   deletedAt DateTime? 
//   isDeleted Boolean @default(false)

export interface IUser{
    name:string,
    id:string,
    email:string,
    userPhoto:string,
    
}