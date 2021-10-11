import { FC } from "react";
import IComment from "../../models/IComment";
import { ListItem, ListItemText, Typography } from "@mui/material";

type Props = Pick<IComment, "body">;

const Comment: FC<Props> = ({ body }) => {
  return (
    <ListItem>
      <ListItemText>
        <Typography variant='h6' color='primary'>
          {body}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

export default Comment;
