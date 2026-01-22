
interface EvaluationScores {
    safety: number;
    execution: number;
    impact: number;
    openness: number;
    communication: number;
    grit: number;
}

const TRAIT_LABELS: Record<keyof EvaluationScores, string> = {
    safety: "심리적 안정감",
    execution: "실행력",
    impact: "영향력",
    openness: "개방성",
    communication: "소통 능력",
    grit: "끈기(Grit)"
};

export function generateMemberAnalysis(name: string, scores: EvaluationScores, role: string): string {
    // 1. Identify Top Strengths (Scores >= 4.5 is Outstanding, >= 4.0 is Strong)
    const entries = Object.entries(scores) as [keyof EvaluationScores, number][];
    const sorted = entries.sort(([, a], [, b]) => b - a);

    const topTraits = sorted.filter(([, score]) => score >= 4.0);
    const weakTraits = sorted.filter(([, score]) => score <= 2.5);

    // 2. Generate Narrative based on Top Trait combinations
    let narrative = "";

    if (topTraits.length === 0) {
        return `${name}님은 전반적으로 균형 잡힌 역량을 보유하고 있으며, 특정 분야의 전문성을 개발할 잠재력이 큽니다.`;
    }

    const primaryTrait = topTraits[0][0]; // Best trait

    // Complex Logic for Richer Description
    if (primaryTrait === 'execution') {
        narrative = `${name}님은 목표를 끝까지 완수해내는 강력한 '실행력'이 돋보입니다. `;
        if (scores.grit >= 4.0) narrative += "장애물에도 굴하지 않는 '끈기'까지 갖추어 어려운 프로젝트도 믿고 맡길 수 있는 인재입니다.";
        else if (scores.communication >= 4.0) narrative += "협업 과정에서도 빠르고 명확하게 소통하며 팀의 속도를 높여줍니다.";
        else narrative += "다만, 실행 속도만큼 과정에서의 소통도 챙긴다면 더욱 완벽한 성과를 낼 것입니다.";
    }
    else if (primaryTrait === 'safety') {
        narrative = `${name}님은 팀 내에서 '심리적 안정감'을 형성하는 데 핵심적인 역할을 합니다. `;
        if (scores.openness >= 4.0) narrative += "동료의 다양한 의견을 유연하게 수용하며 창의적인 문화를 만듭니다.";
        else if (scores.communication >= 4.0) narrative += "솔직하고 투명한 소통으로 팀의 신뢰 자본을 구축하는 스타일입니다.";
        else narrative += "팀의 결속력을 높이는 따뜻한 리더십을 발휘할 수 있습니다.";
    }
    else if (primaryTrait === 'grit') {
        narrative = `${name}님은 쉽게 포기하지 않는 '끈기(Grit)'가 가장 큰 강점입니다. `;
        if (scores.execution >= 4.0) narrative += "장기적인 목표를 위해 꾸준히 실행하며 반드시 성과를 만들어냅니다.";
        else narrative += "어려운 과제에 직면했을 때 팀의 버팀목이 되어줄 것입니다.";
    }
    else if (primaryTrait === 'impact') {
        narrative = `${name}님은 업무의 의미와 '영향력'을 중요하게 여기는 동기부여형 인재입니다. `;
        if (scores.execution >= 4.0) narrative += "높은 목표 의식을 바탕으로 실제적인 성과를 만들어내는 드라이브가 강합니다.";
        else narrative += "팀의 비전과 미션에 깊이 공감하며 동료들에게 영감을 줍니다.";
    }
    else if (primaryTrait === 'communication') {
        narrative = `${name}님은 명확하고 투명한 '소통 능력'이 탁월합니다. `;
        if (scores.safety >= 4.0) narrative += "동료의 의견을 경청하며 안전한 대화 분위기를 주도합니다.";
        else narrative += "복잡한 문제도 원활한 커뮤니케이션으로 풀어가는 해결사 역할을 합니다.";
    }
    else if (primaryTrait === 'openness') {
        narrative = `${name}님은 새로운 아이디어에 열려있는 '개방성'이 강점입니다. `;
        if (scores.impact >= 4.0) narrative += "변화를 두려워하지 않고 혁신적인 시도를 통해 조직에 임팩트를 만듭니다.";
        else narrative += "유연한 사고로 팀에 신선한 관점을 제공합니다.";
    }

    // 3. Add Constructive Feedback (Weakness) - handle carefully
    if (weakTraits.length > 0) {
        const weakTrait = weakTraits[weakTraits.length - 1][0]; // Lowest
        // Avoid repeating if it conflicts or if max == min (all scores same)
        if (sorted[0][1] !== sorted[sorted.length - 1][1]) {
            narrative += ` 단, '${TRAIT_LABELS[weakTrait]}' 측면에서는 의도적인 노력이나 팀 차원의 보완이 필요할 수 있습니다.`;
        }
    }

    return narrative;
}
