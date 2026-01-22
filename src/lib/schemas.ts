import { z } from "zod";

// --- Enums ---
export const MBTI_ENUM = [
    "ISTJ", "ISFJ", "INFJ", "INTJ",
    "ISTP", "ISFP", "INFP", "INTP",
    "ESTP", "ESFP", "ENFP", "ENTP",
    "ESTJ", "ESFJ", "ENFJ", "ENTJ"
] as const;

export const MEMBER_SCHEMA = z.object({
    id: z.string(),
    name: z.string().min(1, "이름을 입력해주세요"),
    role: z.string().min(1, "직책을 입력해주세요"),
    mbti: z.enum(MBTI_ENUM).or(z.literal("")).refine(val => val !== "", { message: "MBTI를 선택해주세요" }),
    isLeader: z.boolean()
});

// --- Main Request Schema ---
export const TALENT_REQUEST_SCHEMA = z.object({
    // Step 1
    teamMembers: z.array(MEMBER_SCHEMA).min(1, "팀원은 최소 1명 이상이어야 합니다"),
    teamGoal: z.string().min(5, "팀 목표는 5자 이상 구체적으로 작성해주세요"),

    // Step 2
    strategy: z.enum(["clone", "complement"]),
    role: z.string().min(2, "채용 직군은 2자 이상 입력해주세요 (예: 마케터, 개발자)"),
    experience: z.string().min(1, "경력 요건을 입력해주세요"),

    // Optional but recommended
    duties: z.string().optional(),
    skills: z.string().optional(),

    // Step 3
    interviewFocus: z.array(z.string()),
    customQuestions: z.array(z.string())
});

export type TalentRequestForm = z.infer<typeof TALENT_REQUEST_SCHEMA>;
