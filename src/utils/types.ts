interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
}

interface Column {
    id: string,
    name: string;
    tasks: Task[];
}

interface Board {
    id: string;
    name: string;
    isActive: boolean;
    columns: Column[];
}

interface Project {
    boards: Board[];
}

interface ProjectAndBoardStatus {
    project: Project;
    currentBoardIndex: number;
}

interface OpenModals {
    openTaskById: string | null
    activeModal: string | null
}

type ChangeEventType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
