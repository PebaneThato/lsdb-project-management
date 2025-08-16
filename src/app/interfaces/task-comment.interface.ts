export interface TaskComment {
    commentId: number;
    commentContent: string;
    commentAddedById: number;
    commentAddedByName: string;
    taskId: number;
    commentDateTime: string;
}

export interface TaskCommentResponse {
    success: string;
    message: string;
    data: TaskComment;
}

export interface TaskCommentsResponse {
    success: string;
    message: string;
    data: TaskComment[];
}