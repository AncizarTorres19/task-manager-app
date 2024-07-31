import { UseFormRegister } from "react-hook-form";

export interface AuthFormData {
    email:     string;
    name?:     string;
    password:  string;
}

export interface AuthCardProps {
    readonly description:   string;
    readonly moodRegister?: boolean;
    readonly onSubmit:      (e: React.FormEvent) => void;
    readonly register:      UseFormRegister<AuthFormData>;
    readonly textButton:    string;
    readonly title:         string;
}

export interface Task {
    id:          number;
    name:        string;
    description: string;
    enabled?:    boolean;
    priority:    string;
    createdAt?:  Date;
}