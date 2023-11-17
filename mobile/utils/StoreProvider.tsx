import React from 'react'

interface User {
    id: number;
    name: string;
    email: string;
    surname: string;
    work: string;
    gender: string;
    birth_date: string;
    subordinates: number[];
    picture: string;
}

export const StoreContext = React.createContext<{
    employees: [([User]), React.Dispatch<React.SetStateAction<([User])>>],
    scrollPosition: number,
    selectedTeamMemberId: number,
    selectedTeamMemberName: string
}>(null)

export default ({ children }) => {
    const [employees, setEmployees] = React.useState<any[]>([]);
    const [scrollPosition, setScrollPosition] = React.useState(1);
    const [selectedTeamMemberId, setSelectedTeamMemberId] = React.useState(0);
    const [selectedTeamMemberName, setSelectedTeamMemberName] = React.useState("");

    const store = {
        employees: [employees, setEmployees],
        scrollPosition: [scrollPosition, setScrollPosition],
        selectedTeamMemberId: [selectedTeamMemberId, setSelectedTeamMemberId],
        selectedTeamMemberName: [selectedTeamMemberName, setSelectedTeamMemberName],
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
