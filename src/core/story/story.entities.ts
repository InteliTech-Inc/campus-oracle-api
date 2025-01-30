import { Comment } from "./comment/comment.entities";

type StoryUser = {
    name: string;
    email: string;
    phone: string;
    campus: string;
    story_id?: number;
};

type Story = {
    id: number;
    category: string;
    content: string;
    sharing_type: "public" | "admin" | "both";
    likes: number;
    isVerified: boolean;
    comments: Comment[];
    user?: StoryUser;
    created_at: Date;
    updated_at: Date;
};

export const initialStory: Omit<
    Story,
    "created_at" | "updated_at" | "id" | "comments"
> = {
    category: "",
    isVerified: false,
    content: "",
    sharing_type: "admin",
    likes: 0,
};

export default Story;
