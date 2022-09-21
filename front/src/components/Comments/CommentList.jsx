import AddComment from "./AddComment";
import Comment from "./Comment";

import { Stack } from "react-bootstrap"

export default function CommentList({ id, comments }) {
    return (
        <>
            <AddComment id={id} />
            <Stack gap={2}>
                {
                    comments ?
                        comments.map((c, i) => <Comment key={`${id}-${c.userId}-${i}`} id={id} userId={c.userId} text={c.comment} />)
                        : "Nan"
                }
            </Stack>
        </>
    )
}