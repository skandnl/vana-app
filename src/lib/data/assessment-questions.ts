export interface AssessmentQuestion {
    id: string;
    category: 'safety' | 'execution' | 'grit' | 'openness' | 'impact' | 'communication';
    text: string;
    source?: string; // e.g., "Amy Edmondson", "Duckworth"
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
    // 1. Psychological Safety (심리적 안정감) - Amy Edmondson
    {
        id: 'ps-1',
        category: 'safety',
        text: '나는(이 분은) 실수를 하더라도 숨기지 않고 솔직하게 공유하며, 이를 학습의 기회로 삼는다.',
        source: 'Amy Edmondson'
    },
    {
        id: 'ps-2',
        category: 'safety',
        text: '나는(이 분은) 동료들에게 어려운 문제나 걱정거리를 제기하는 것에 대해 주저함이 없다.',
        source: 'Amy Edmondson'
    },
    {
        id: 'ps-3',
        category: 'safety',
        text: '나는(이 분은) 나의 독특한 기술이나 재능을 팀에서 적극적으로 활용하려고 노력한다.',
        source: 'Amy Edmondson'
    },
    {
        id: 'ps-4',
        category: 'safety',
        text: '나는(이 분은) 모르는 것이 있을 때 동료에게 도움을 요청하는 것을 부끄러워하지 않는다.',
        source: 'Amy Edmondson'
    },

    // 2. Execution (실행력) - Agile/High Performance Teams
    {
        id: 'ex-1',
        category: 'execution',
        text: '나는(이 분은) 목표를 달성하기 위해 구체적이고 명확한 행동 계획을 수립하는 편이다.',
        source: 'High Performance Models'
    },
    {
        id: 'ex-2',
        category: 'execution',
        text: '결정이 내려지면, 지체 없이 실행에 옮기며 약속된 기한을 철저히 준수한다.',
        source: 'High Performance Models'
    },
    {
        id: 'ex-3',
        category: 'execution',
        text: '업무 진행 과정에서의 병목 현상이나 장애물을 만나면 주도적으로 해결책을 찾는다.',
        source: 'High Performance Models'
    },

    // 3. Grit (그릿/끈기) - Angela Duckworth
    {
        id: 'gr-1',
        category: 'grit',
        text: '나는(이 분은) 좌절이나 실패를 겪더라도 쉽게 포기하지 않고 끝까지 목표를 추구한다.',
        source: 'Angela Duckworth'
    },
    {
        id: 'gr-2',
        category: 'grit',
        text: '장기적인 성과를 위해 당장의 지루함이나 어려움을 견뎌내는 인내심이 있다.',
        source: 'Angela Duckworth'
    },
    {
        id: 'gr-3',
        category: 'grit',
        text: '프로젝트가 어려워져도 처음의 열정과 관심을 유지하며 끝까지 마무리한다.',
        source: 'Angela Duckworth'
    },

    // 4. Openness (개방성) - Big Five
    {
        id: 'op-1',
        category: 'openness',
        text: '나는(이 분은) 기존의 방식에 얽매이지 않고 새로운 아이디어와 접근 방식을 적극 수용한다.',
        source: 'Big Five Inventory'
    },
    {
        id: 'op-2',
        category: 'openness',
        text: '다양한 배경이나 관점을 가진 사람들과 일하는 것을 즐기며, 이를 배움의 기회로 여긴다.',
        source: 'Big Five Inventory'
    },
    {
        id: 'op-3',
        category: 'openness',
        text: '변화하는 상황이나 불확실성에 대해 불안해하기보다 유연하게 대처한다.',
        source: 'Big Five Inventory'
    },

    // 5. Impact (영향력/의미) - Google Project Aristotle
    {
        id: 'im-1',
        category: 'impact',
        text: '나는(이 분은) 자신의 업무가 조직과 고객에게 긍정적인 영향을 미친다고 믿으며 일한다.',
        source: 'Project Aristotle'
    },
    {
        id: 'im-2',
        category: 'impact',
        text: '내가 하는 일의 의미와 목적에 대해 명확하게 인지하고 있으며, 이를 중요하게 생각한다.',
        source: 'Project Aristotle'
    },

    // 6. Communication (소통) - Google re:Work
    {
        id: 'cm-1',
        category: 'communication',
        text: '나는(이 분은) 정보를 투명하게 공유하며, 동료들에게 예의 바르고 솔직하게 소통한다.',
        source: 'Google re:Work'
    },
    {
        id: 'cm-2',
        category: 'communication',
        text: '동료의 의견을 경청하며, 내 의견과 다르더라도 존중하는 태도를 유지한다.',
        source: 'Active Listening'
    }
];

// Helper to get questions by category
export const getQuestionsByCategory = (category: AssessmentQuestion['category']) => {
    return ASSESSMENT_QUESTIONS.filter(q => q.category === category);
};
