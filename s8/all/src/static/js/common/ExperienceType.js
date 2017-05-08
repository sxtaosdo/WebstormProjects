const ExperienceType = {
    HIGH: 'High Quality (Core)',
    MEDIUM: 'Medium Quality (Core Light)',
    LOW: 'Low Quality (Preorder)',
};

export const ExperienceTypeKeys = {};

for (let key in ExperienceType) {
    let experienceType = ExperienceType[key];
    ExperienceTypeKeys[experienceType] = key;
}

export default ExperienceType;
