import { useState, useEffect } from 'react';

export interface Idea {
    id: string;
    title: string;
    category: string;
    description: string;
    submittedBy: string;
    timestamp: number;
}

export interface Team {
    id: string;
    name: string;
    assignedIdeaId?: string;
}

export const useStore = () => {
    const [ideas, setIdeas] = useState<Idea[]>(() => {
        const saved = localStorage.getItem('hackathon_ideas');
        return saved ? JSON.parse(saved) : [];
    });

    const [teams, setTeams] = useState<Team[]>(() => {
        const saved = localStorage.getItem('hackathon_teams');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('hackathon_ideas', JSON.stringify(ideas));
    }, [ideas]);

    useEffect(() => {
        localStorage.setItem('hackathon_teams', JSON.stringify(teams));
    }, [teams]);

    const addIdea = (idea: { title: string, category: string, description: string, submittedBy: string }) => {
        // Simple similarity check
        const isDuplicate = ideas.some(i =>
            i.title.toLowerCase().trim() === idea.title.toLowerCase().trim()
        );

        if (isDuplicate) {
            throw new Error("A similar idea already exists! Please innovate further.");
        }

        const newIdea: Idea = {
            ...idea,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
        };

        setIdeas(prev => [...prev, newIdea]);
    };

    const addTeams = (names: string[]) => {
        const newTeams: Team[] = names.map(name => ({
            id: Math.random().toString(36).substr(2, 9),
            name,
        }));
        setTeams(newTeams);
    };

    const clearTeams = () => {
        setTeams([]);
        localStorage.removeItem('hackathon_teams');
    };

    const allocateIdeas = () => {
        if (ideas.length * 3 < teams.length) {
            throw new Error(`Not enough ideas! We have ${ideas.length} ideas which can serve at most ${ideas.length * 3} teams.`);
        }

        let updatedTeams: Team[] = [];
        let ideaPool: string[] = [];

        // Build a pool where each idea exists 3 times
        ideas.forEach(idea => {
            ideaPool.push(idea.id, idea.id, idea.id);
        });

        // Shuffle the pool
        ideaPool.sort(() => Math.random() - 0.5);

        let lastIdeaId = '';
        const currentTeams = [...teams];

        for (let i = 0; i < currentTeams.length; i++) {
            // Find an idea that isn't the same as the last one
            let poolIndex = ideaPool.findIndex(id => id !== lastIdeaId);

            // If we can't find one (should be rare/impossible with enough unique ideas), 
            // just take the first one available
            if (poolIndex === -1) poolIndex = 0;

            const selectedIdeaId = ideaPool.splice(poolIndex, 1)[0];
            updatedTeams.push({
                ...currentTeams[i],
                assignedIdeaId: selectedIdeaId
            });
            lastIdeaId = selectedIdeaId;
        }

        setTeams(updatedTeams);
    };

    const assignRandomIdeaToTeam = (teamName: string) => {
        const lastAssignedIdeaId = teams.length > 0 ? teams[teams.length - 1].assignedIdeaId : null;

        // Count usage of each idea
        const ideaUsage: Record<string, number> = {};
        teams.forEach(t => {
            if (t.assignedIdeaId) {
                ideaUsage[t.assignedIdeaId] = (ideaUsage[t.assignedIdeaId] || 0) + 1;
            }
        });

        const availableIdeas = ideas.filter(idea => {
            const usageCount = ideaUsage[idea.id] || 0;
            return usageCount < 3 && idea.id !== lastAssignedIdeaId;
        });

        if (availableIdeas.length === 0) {
            // Fallback: If no idea satisfies the "non-consecutive" rule, but some ideas still have < 3 usage
            const anyAvailable = ideas.filter(idea => (ideaUsage[idea.id] || 0) < 3);
            if (anyAvailable.length === 0) {
                throw new Error("Maximum capacity reached. All ideas have been used 3 times.");
            }
            availableIdeas.push(...anyAvailable);
        }

        const randomIndex = Math.floor(Math.random() * availableIdeas.length);
        const selectedIdea = availableIdeas[randomIndex];

        const newTeam: Team = {
            id: Math.random().toString(36).substr(2, 9),
            name: teamName,
            assignedIdeaId: selectedIdea.id,
        };

        setTeams(prev => [...prev, newTeam]);
    };

    const clearIdeas = () => {
        setIdeas([]);
        localStorage.removeItem('hackathon_ideas');
    };

    const unassignAllIdeas = () => {
        setTeams(prev => prev.map(t => ({ ...t, assignedIdeaId: undefined })));
    };

    return { ideas, teams, addIdea, addTeams, clearTeams, clearIdeas, unassignAllIdeas, allocateIdeas, assignRandomIdeaToTeam };
};
