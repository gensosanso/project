export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruiter' | 'viewer';
  createdAt: Date;
};

export type Candidate = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  educationLevel: string;
  specialization: string;
  yearsOfExperience: number;
  cvUrl?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  recruitmentStage: 'applied' | 'screening' | 'technical_test' | 'interview' | 'offer' | 'hired' | 'rejected';
  campaignId: string;
  createdAt: Date;
};

export type Campaign = {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  status: 'draft' | 'active' | 'closed';
  startDate: Date;
  endDate?: Date;
  criteria: {
    minEducationLevel: string;
    minYearsExperience: number;
    ageRange?: {
      min: number;
      max: number;
    };
    specializations: string[];
  };
  form?: Form;
  createdAt: Date;
};

export type Form = {
  title: string;
  description: string;
  questions: {
    question: string;
    required: boolean;
  }[];
  requireCV: boolean;
  requireCoverLetter: boolean;
};

export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: Date;
};

export type Communication = {
  id: string;
  subject: string;
  body: string;
  recipients: string[];
  sentAt: Date;
  sentBy: string;
  templateId?: string;
};

export type Document = {
  id: string;
  name: string;
  type: string;
  url: string;
  candidateId: string;
  uploadedAt: Date;
};

export type ReportType = 'gender' | 'age' | 'education' | 'response' | 'status';

export type FilterCriteria = {
  educationLevel?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  specialization?: string[];
  yearsOfExperience?: number;
};